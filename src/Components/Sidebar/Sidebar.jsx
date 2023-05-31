import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = (props) => {
    const [activeTab, setActiveTab] = useState("coordinates");
    const [showCoordinates, setShowCoordinates] = useState(false);
    const { coordinates } = props;
    const points = ["SE Lat", "SE Lng", "NW Lat", "NW Lng"]

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
        if (tabName === "coordinates") {
            setShowCoordinates(!showCoordinates);
        }
    };

    return (
        <div className="sidebar mx-2">
            <ul className="nav nav-tabs flex-column">
                <li className="nav-item">
                    <a className={`nav-link ${activeTab === "coordinates" ? "active" : ""}`} onClick={() => handleTabClick("coordinates")}>
                        Coordinates
                    </a>
                    <div className="tab-content" id="nav-tabContent">
                        <div className={`tab-pane fade ${showCoordinates ? 'show active' : ''}`} id="nav-coordinates" aria-labelledby="nav-coordinates-tab">
                            <div className="card">
                                <div className="card-header">Selected Coordinates</div>
                                <div className="card-body">
                                    <div>
                                        <p className="fs-4 fw-bold text-center">Coordinates:</p>
                                        <div>
                                            {coordinates.map((cord, index) => (
                                                <div key={index}>
                                                    <div className="row">
                                                        <div className="col-5 d-flex align-items-center justify-content-center">
                                                            <div className="fw-semibold ">{points[index]}</div>
                                                        </div>
                                                        <div className="col-7 d-flex align-items-center justify-content-center">
                                                            <div className="text-light rounded px-1 m-1" id="cordBox">
                                                                <p>
                                                                    {cord}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
