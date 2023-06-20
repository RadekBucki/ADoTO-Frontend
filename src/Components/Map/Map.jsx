import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { useState, useRef, useCallback } from "react";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import "leaflet-draw/dist/leaflet.draw.css";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import { Button } from "react-bootstrap";
import Select from "react-select";
import { canvas } from "leaflet";
window.type = true;

const Map = () => {
    const config = {
        url: import.meta.env.VITE_BASE_URL,
        bud: import.meta.env.VITE_BUD,
        river: import.meta.env.VITE_RIVER,
        forest: import.meta.env.VITE_FOREST,
        road: import.meta.env.VITE_ROAD,
    };
    const optionList = [
        { value: config.bud, label: "Buildings" },
        { value: config.river, label: "Rivers" },
        { value: config.forest, label: "Forest" },
        { value: config.road, label: "Road" },
    ];
    const drawnItemsRef = useRef(null);
    const [coordinates, setCoordinates] = useState([]);
    const [swValues, setSwValues] = useState([]);
    const [neValues, setNeValues] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState();
    const [image, setImage] = useState(null);
    const position = [51.76, 19.46];
    const colors = ["red", "green", "blue", "orange"];
    const svgColors = ["yellow", "purple", "pink", "brown"];
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

    const handleSelect = (data) => {
        setSelectedOptions(data);
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
                `${config.url}/geoportal/satellite/epsg2180?width=1000&minx=${swValues.first}&miny=${swValues.second}&maxx=${neValues.first}&maxy=${neValues.second}`
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
        img.onload = function () {
            let canvasCtx = document.getElementById("imageCanvas").getContext("2d");
            // canvasCtx.clearRect(0, 0, 1000, 1000);
            canvasCtx.drawImage(img, 0, 0);
        };
    };

    const testSvgObj = (layer, color) => {
        axios
            .get(
                `${config.url}/geoportal/svgObjects?height=1000&width=1000&minx=${swValues.first}&miny=${swValues.second}&maxx=${neValues.first}&maxy=${neValues.second}&layer=${layer}`
            )
            .then((response) => {
                console.log(response);
                draw(response, color);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const testAiObj = (layer, color) => {
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
                        "content-type": "application/json",
                    },
                }
            )
            .then((response) => {
                console.log(response);
                draw(response, color);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const draw = (response, color) => {
        let canvasCtx = document.getElementById("imageCanvasAi").getContext("2d");
        response.data.forEach((object) => {
            canvasCtx.strokeStyle = color;
            canvasCtx.lineWidth = 4;
            canvasCtx.beginPath();
            for (let i = 0; i < object.length; i++) {
                if (i === 0) canvasCtx.moveTo(object[i].x, object[i].y);
                else canvasCtx.lineTo(object[i].x, object[i].y);
            }
            canvasCtx.stroke();
        });
    };
    const drawAll = () => {
        refresh();
        for (let i = 0; i < selectedOptions.length; i++) {
            testAiObj(selectedOptions[i].value, colors[i]);
            testSvgObj(selectedOptions[i].value, svgColors[i]);
        }
    };
    const refresh = () => {
        let canvasCtx = document.getElementById("imageCanvasAi").getContext("2d");
        canvasCtx.clearRect(0, 0, 1000, 1000);
    };

    return (
        <div className="container-fluid bg-dark">
            <div className="row">
                <div className="col-lg-9">
                    <section className="map-component mt-5">
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
                <div className="col-lg-3 mt-5">
                    <Sidebar coordinates={coordinates} />
                </div>
            </div>
            <div className="control">
                <Button className="col text-dark btncolor" onClick={sendSquare}>
                    GET DATA
                </Button>
                <div className="select">
                    <Select
                        className="my-4"
                        options={optionList}
                        placeholder="Select option"
                        value={selectedOptions}
                        onChange={handleSelect}
                        isSearchable={true}
                        isMulti
                    />
                </div>
                <Button className="col text-dark btncolor" onClick={drawAll}>
                    GET OUTLINES
                </Button>
                {image ? (
                    <Button className="col text-dark mt-4 btncolor" onClick={refresh}>
                        REMOVE
                    </Button>
                ) : (
                    ""
                )}
            </div>
            {image ? (
                <div id="imageContainer">
                    <canvas id="imageCanvas" width="1000" height="1000" />
                    <canvas id="imageCanvasAi" width="1000" height="1000" />
                </div>
            ) : (
                <div className="placeholder"></div>
            )}
        </div>
    );
};

export default Map;
