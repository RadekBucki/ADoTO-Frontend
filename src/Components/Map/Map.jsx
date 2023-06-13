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
        url: import.meta.env.VITE_BASE_URL,
        bud: import.meta.env.VITE_BUD,
        river: import.meta.env.VITE_RIVER,
        forest: import.meta.env.VITE_FOREST,
        road: import.meta.env.VITE_ROAD,
    };
    const drawnItemsRef = useRef(null);
    const [coordinates, setCoordinates] = useState([]);
    const [swValues, setSwValues] = useState([]);
    const [neValues, setNeValues] = useState([]);
    const [image, setImage] = useState(null);
    const position = [51.76, 19.46];

    const handleSetNe = () => {
        const obj = {
            first: neValues.first,
            second: neValues.second,
        };
        setNeValues({
            ...obj,
        });
    };

    const handleSetSw = () => {
        const obj = {
            first: swValues.first,
            second: swValues.second,
        };
        setSwValues({
            ...obj,
        });
    };

    const sendEPSG2180 = useCallback(async (coordinates) => {
        axios.get(`${config.url}/convert/to/epsg2180?x=${coordinates[0]}&y=${coordinates[1]}`).then((response) => {
            setNeValues(response.data);
        });
        axios.get(`${config.url}/convert/to/epsg2180?x=${coordinates[2]}&y=${coordinates[3]}`).then((response) => {
            setSwValues(response.data);
        });
    }, []);

    const sendSquare = () => {
        handleSetNe();
        handleSetSw();
        const width = neValues.first - swValues.first;
        const height = neValues.second - swValues.second;
        const second = neValues.first + (swValues.second - swValues.first);
        setNeValues({
            ...neValues,
            second: second,
        });
        axios
            .get(
                `${config.url}/geoportal/satellite/epsg2180?width=1000&minx=${
                    swValues.first
                }&miny=${swValues.second}&maxx=${neValues.first}&maxy=${
                    neValues.second
                }`
            )
            .then((response) => {
                const data = response.data;

                if (response.status === 200 && data && data.base64) {
                    setImage(data.base64);
                    const imageUrl = `data:image/png;base64,${data.base64}`;
                    displayImage(imageUrl);
                }
            });
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

    const displayImage = (imageUrl) => {
        const img = new Image();
        img.src = imageUrl;
        img.onload = function(){
            let canvasCtx = document.getElementById("imageCanvas").getContext("2d")
            canvasCtx.drawImage(img, 0, 0);
        }
    };
    const testSvgObj = (layer) => {
        axios
            .get(
                `${config.url}/geoportal/svgObjects?height=1000&width=1000&minx=${
                    swValues.first
                }&miny=${swValues.second}&maxx=${neValues.first}&maxy=${
                    neValues.second
                }&layer=${layer}`
            )
            .then((response) => {
                console.log(response);

                let canvasCtx = document.getElementById("imageCanvas").getContext("2d")

                response.data.forEach((object) => {
                    canvasCtx.moveTo(object[0].x, object[0].y);
                    canvasCtx.lineWidth = 2;
                    canvasCtx.strokeStyle = '#ff0000';
                    canvasCtx.stroke();
                    object.forEach((point) => {
                        canvasCtx.lineTo(point.x, point.y);
                    });
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const testAiObj = (layer) => {
        axios
                .post(
                        `${config.url}/ai/svgObjects`,
                        {
                            width: 1000,
                            layer: layer,
                            base64Image: image,
                            minx: swValues.first,
                            miny: swValues.second,
                            maxx: neValues.first,
                            maxy: neValues.second,
                        },
                        {
                            headers: {
                                'content-type': 'application/json'
                            }
                        }
                )
                .then((response) => {
                    console.log(response);

                    let canvasCtx = document.getElementById("imageCanvasAi").getContext("2d")

                    response.data.forEach((object) => {
                        canvasCtx.moveTo(object[0].x, object[0].y);
                        canvasCtx.lineWidth = 2;
                        canvasCtx.strokeStyle = '#00ff00';
                        canvasCtx.stroke();
                        object.forEach((point) => {
                            canvasCtx.lineTo(point.x, point.y);
                        });
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
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
                    <Button onClick={() => testSvgObj(config.bud)}>Test svg objects BUILDING</Button>
                    <Button onClick={() => testAiObj(config.bud)}>Test ai objects BUILDING</Button>
                    <Button onClick={() => testSvgObj(config.road)}>Test svg objects ROAD</Button>
                    <Button onClick={() => testAiObj(config.road)}>Test ai objects ROAD</Button>
                    <Button onClick={() => testSvgObj(config.forest)}>Test svg objects FOREST</Button>
                    <Button onClick={() => testAiObj(config.forest)}>Test ai objects FOREST</Button>
                    <Button onClick={() => testSvgObj(config.river)}>Test svg objects WATER</Button>
                    <Button onClick={() => testAiObj(config.river)}>Test ai objects WATER</Button>
                </div>
            </div>
            <div id="imageContainer"></div>
            <canvas id="imageCanvas" width="1000" height="1000" />
            <canvas id="imageCanvasAi" width="1000" height="1000" />
        </div>
    );
};

export default Map;

