import React, { useState } from "react";
import "./Sidebar.css";

Sidebar = () => {
    const [activeTab, setActiveTab] = useState("coordinates");
    const [showCoordinates, setShowCoordinates] = useState(false);
    const [showLayers, setShowLayers] = useState(false);

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
        if (tabName === "coordinates") {
            setShowCoordinates(!showCoordinates);
        } else if (tabName === "layers") {
            setShowLayers(!showLayers);
        }
    };

    const coordinatesGeoJSON = {
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [0, 0]
            }
        }]
    };

    return (
        <div className="sidebar">
            <ul className="nav nav-tabs flex-column">
                <li className="nav-item">
                    <a className={`nav-link ${activeTab === "coordinates" ? "active" : ""}`} onClick={() => handleTabClick("coordinates")}>
                        Coordinates
                    </a>
                    <div className="tab-content" id="nav-tabContent">
                        <div className={`tab-pane fade ${showCoordinates ? 'show active' : ''}`} id="nav-coordinates" role="tabpanel" aria-labelledby="nav-coordinates-tab">
                            <div className="card">
                                <div className="card-header">Selected Coordinates</div>
                                <div className="card-body">
                                    <div>

                                        <h5>Coordinates in GeoJSON format:</h5>
                                        <pre>{JSON.stringify(coordinatesGeoJSON, null, 2)}</pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${activeTab === "layers" ? "active" : ""}`} onClick={() => handleTabClick("layers")}>
                        Layers
                    </a>
                    <div className={`card tab-pane fade ${showLayers ? 'show active' : ''}`} id="nav-layers" role="tabpanel" aria-labelledby="nav-layers-tab">
                        <div className="card-header">Available Layers</div>
                        <div className="card-body">
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
