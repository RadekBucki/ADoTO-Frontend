import { MapContainer, TileLayer, Marker, Popup, FeatureGroup } from "react-leaflet";
import { Edit, Icon } from "leaflet";
import { useState, useRef } from "react";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import "leaflet-draw/dist/leaflet.draw.css";
window.type = true;
const Map = () => {
    const drawnItemsRef = useRef(null);
    let [coordinates, setCoordinates] = useState([]);
    const position = [51.76, 19.46];
    const customIcon = new Icon({
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.6.0/images/marker-icon.png",
        iconSize: [20, 20],
    });

    const handleCreate = (e) => {
        if (drawnItemsRef.current) {
            drawnItemsRef.current.clearLayers();
            drawnItemsRef.current.addLayer(e.layer);
        }
        setCoordinates(e.layer.getLatLngs()[0]);
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
                    <Marker position={position} icon={customIcon}>
                        <Popup>Clicked🎉</Popup>
                    </Marker>
                </MapContainer>
            </div>
            <div>
                {coordinates.map((cord, index) => (
                    <div key={index}>
                        <p>
                            {cord.lng} x {cord.lat}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Map;
