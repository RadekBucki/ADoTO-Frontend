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
            <div>
                <div className="container-fluid vh-100 bg-dark">
                        <p>lorem ipsum</p>
                        <p>lorem ipsum</p>
                        <p>lorem ipsum</p>
                        <p>lorem ipsum</p>
                        <p>lorem ipsum</p>
                </div>
                <Navbar />
            </div>
    );
};

export default Issues;
