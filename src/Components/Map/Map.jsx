import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { useState, useRef, useCallback } from "react";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import "leaflet-draw/dist/leaflet.draw.css";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import { Button } from "react-bootstrap";
window.type = true;

const Map = () => {
    const config = {
        url: import.meta.env.VITE_BASE_URL
    }
    const drawnItemsRef = useRef(null);
    const [coordinates, setCoordinates] = useState([]);
    const [swValues, setSwValues] = useState([]);
    const [neValues, setNeValues] = useState([]);
    const position = [51.76, 19.46];

    const handleSetNe = () => {
        const obj = {
            first: Math.round(neValues.first),
            second: Math.round(neValues.second),
        };
        setNeValues({
            ...obj,
        });
    };

    const handleSetSw = () => {
        const obj = {
            first: Math.round(swValues.first),
            second: Math.round(swValues.second),
        };
        setSwValues({
            ...obj,
        });
    };

    const sendEPSG2180 = useCallback(async (coordinates) => {
        axios
            .get(`${config.url}/convert/to/epsg2180?x=${coordinates[0]}&y=${coordinates[1]}`)
            .then((response) => {
                setNeValues(response.data);
            })
        axios
            .get(`${config.url}/convert/to/epsg2180?x=${coordinates[2]}&y=${coordinates[3]}`)
            .then((response) => {
                setSwValues(response.data);
            })
    }, []);

    const sendSquare = () => {
        handleSetNe();
        handleSetSw();
        const width = neValues.first - swValues.first;
        const height = neValues.second - swValues.second;
        const second = neValues.first + (swValues.first - swValues.last);
        setNeValues({
            ...neValues,
            second: second,
        });
        axios
            .get(
                `${config.url}/geoportal/satellite/epsg2180?width=1000&minx=${Math.round(
                    swValues.first
                )}&miny=${Math.round(swValues.second)}&maxx=${Math.round(neValues.first)}&maxy=${Math.round(
                    neValues.second
                )}`
            )
            .then((response) => {
                const data = response.data;

                if (response.status === 200 && data && data.base64) {
                    const imageUrl = `data:image/png;base64,${data.base64}`;
                    displayImage(imageUrl);
                }
            })
    };

    const handleCreate = async (e) => {
        if (drawnItemsRef.current) {
            drawnItemsRef.current.clearLayers();
            const circle = e.layer;
            const radius = circle.getRadius();
            const center = circle.getLatLng();

            const squareBounds = L.latLngBounds(
                center.toBounds(radius * Math.sqrt(2)).getNorthWest(),
                center.toBounds(radius * Math.sqrt(2)).getSouthEast()
            );
            const square = L.rectangle(squareBounds);
            drawnItemsRef.current.addLayer(square);
            await sendEPSG2180([
                squareBounds.getNorthEast().lat,
                squareBounds.getNorthEast().lng,
                squareBounds.getSouthWest().lat,
                squareBounds.getSouthWest().lng,
            ]);
        }
    };
    const handleEdit = (e) => {
        e.layers.eachLayer((layer) => {
            setCoordinates(layer.getLatLngs()[0]);
        });
    };
    const handleDelete = (e) => {
        setCoordinates([]);
    };

    const displayImage = imageUrl => {
        const img = new Image();
        img.src = imageUrl;
        document.getElementById('imageContainer').appendChild(img);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-9">
                    <section className="map-component">
                        <div className="map">
                            <MapContainer center={position} zoom={6} scrollWheelZoom={true}>
                                <FeatureGroup ref={drawnItemsRef}>
                                    <EditControl
                                        position="topright"
                                        onCreated={handleCreate}
                                        onEdited={handleEdit}
                                        onDeleted={handleDelete}
                                        draw={{
                                            polygon: false,
                                            polyline: false,
                                            circle: true,
                                            rectangle: false,
                                            circlemarker: false,
                                            marker: false,
                                        }}
                                    />
                                </FeatureGroup>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                            </MapContainer>
                        </div>
                    </section>
                </div>
                <div className="col-lg-3">
                    <Sidebar coordinates={coordinates} />
                    <Button onClick={sendSquare}>GET DATA</Button>
                </div>
            </div>
            <div id="imageContainer">
            </div>
        </div>
    );
};

export default Map;

