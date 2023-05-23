import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { useState, useRef } from "react";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import "leaflet-draw/dist/leaflet.draw.css";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
window.type = true;

const Map = () => {
    const drawnItemsRef = useRef(null);
    const [coordinates, setCoordinates] = useState([]);
    const [swValues, setSwValues] = useState([]);
    const [neValues, setNeValues] = useState([]);
    const position = [51.76, 19.46];

    const handleCreate = async (e) => {
        if (drawnItemsRef.current) {
            drawnItemsRef.current.clearLayers();
            const bounds = e.layer.getBounds();
            const ne = bounds.getNorthEast();
            const sw = bounds.getSouthWest();
            await axios
                .get(`http://localhost:8080/convert/to/epsg2180?x=${+sw.lat}&y=${+sw.lng}`)
                .then((response) => {
                    console.log(response);
                    setSwValues(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });

            await axios
                .get(`http://localhost:8080/convert/to/epsg2180?x=${+ne.lat}&y=${+ne.lng}`)
                .then((response) => {
                    console.log(response);
                    setNeValues(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });

            let array = [...neValues];
            array[1] = neValues.first + Math.abs(swValues.first - swValues.second);
            setNeValues(array);

            await axios
                .get(`http://localhost:8080/convert/to/crs84?x=${+swValues.first}&y=${+swValues.second}`)
                .then((response) => {
                    console.log(response);
                    setSwValues(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });

            await axios
                .get(`http://localhost:8080/convert/to/crs84?x=${+neValues.first}&y=${+neValues.second}`)
                .then((response) => {
                    console.log(response);
                    setNeValues(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
            let squareBounds;
            squareBounds = L.rectangle([swValues.first, neValues.first], [swValues.second, neValues.second]);
            drawnItemsRef.current.addLayer(squareBounds);
            setCoordinates(squareBounds.getLatLngs()[0]);
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
                                            circle: false,
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
                </div>
            </div>
        </div>
    );
};

export default Map;

