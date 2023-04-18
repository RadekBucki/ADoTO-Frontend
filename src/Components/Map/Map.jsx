import { MapContainer, TileLayer, Marker, Popup, FeatureGroup } from "react-leaflet";
import { Edit, Icon } from "leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import "leaflet-draw/dist/leaflet.draw.css";
window.type = true;
const Map = () => {
    const position = [51.76, 19.46];

    const customIcon = new Icon({
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.6.0/images/marker-icon.png",
        iconSize: [20, 20],
    });

    const handleCreate = (e) => {
        console.log(e.layer.getLatLngs());
    };
    const handleEdit = (e) => {
        console.log(e);
    };
    const handleDelete = (e) => {
        console.log(e);
    };
    return (
        <section className="map-component">
            <div className="map">
                <MapContainer center={position} zoom={6} scrollWheelZoom={true}>
                    <FeatureGroup>
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
        </section>
    );
};

export default Map;
