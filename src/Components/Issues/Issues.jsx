import Navbar from "../Navbar/Navbar";
import classes from "../Issues/Issues.module.css";

const Issues = () => {
    const config = {
        url: import.meta.env.VITE_BASE_URL,
        bud: import.meta.env.VITE_BUD,
        river: import.meta.env.VITE_RIVER,
        forest: import.meta.env.VITE_FOREST,
        road: import.meta.env.VITE_ROAD,
    };

    return (
            <div className={`${classes.backgroundIssues}  container-fluid vh-100`}>

                <div className={`${classes.mediumPadding} d-flex flex-column justify-content-center align-items-center`}>
                    <div className="row justify-content-center align-items-center">
                        <div className="col">
                            <h2 className="mx-3">Experiencing issues?</h2>
                        </div>
                    </div>
                    <div className="row justify-content-center align-items-center">
                        <div className="col">
                            <h5 className="mx-3">Please check what error you are receiving before contacting us</h5>
                        </div>
                    </div>
                </div>

                <div className={`${classes.smallPadding} d-flex flex-row align-items-center justify-content-center`}>
                    <img />
                    <img />
                </div>

                <div className={`${classes.smallPadding} d-flex flex-column justify-content-center align-items-center`}>
                    <div className="row justify-content-center align-items-center">
                        <div className="col">
                            <h2 className="mx-3">What if you receive error 400 or 404?</h2>
                        </div>
                    </div>
                    <div className="row justify-content-center align-items-center">
                        <div className="col">
                            <h5 className="mx-3">Just refresh</h5>
                        </div>
                    </div>
                </div>

                <div className={`${classes.smallPadding} d-flex flex-row align-items-center justify-content-center`}>
                    <img />
                </div>

                <div className={`${classes.smallPadding} d-flex flex-column justify-content-center align-items-center`}>
                    <div className="row justify-content-center align-items-center">
                        <div className="col">
                            <h2 className="mx-3">Other errors?</h2>
                        </div>
                    </div>
                    <div className="row justify-content-center align-items-center">
                        <div className="col">
                            <h5 className="mx-3">Ask geoportal</h5>
                        </div>
                    </div>
                </div>

                <Navbar />
            </div>
    );
};

export default Issues;
