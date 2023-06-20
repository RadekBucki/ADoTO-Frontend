import Navbar from "../Navbar/Navbar";
import classes from "../Issues/Issues.module.css";
import imgMeme1 from "../../assets/issues_meme_1.png";
import imgMeme2 from "../../assets/issues_meme_2.png";
import imgGeoportal from "../../assets/issues_geoportal.png";
import imgReload from "../../assets/issues_reload.png";

const Issues = () => {
    return (
            <div className={`${classes.backgroundIssues}  container-fluid`}>

                <div className={`${classes.mediumPaddingTop} d-flex flex-column justify-content-center align-items-center`}>
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

                <div className={`${classes.smallPaddingTop} d-flex flex-row align-items-center justify-content-center`}>
                    <img src={imgMeme1} alt="Meme describing how geoportal works" className="p-5"/>
                    <img src={imgMeme2} alt="Second meme describing how geoportal works" className="p-5"/>
                </div>

                <div className={`${classes.smallPaddingTop} d-flex flex-column justify-content-center align-items-center`}>
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

                <div className={`${classes.smallPaddingTop} d-flex flex-row align-items-center justify-content-center`}>
                    <img src={imgReload} alt="Reload icon" className={classes.reloadImage}/>
                </div>

                <div className={`${classes.smallPaddingTop} d-flex flex-column justify-content-center align-items-center`}>
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

                <div className={`${classes.smallPaddingTop} ${classes.mediumPaddingBottom} d-flex flex-row align-items-center justify-content-center`}>
                    <img src={imgGeoportal} alt="Geoportal logo"/>
                </div>

                <Navbar issueClasses={classes['btn-issue']} />
            </div>
    );
};

export default Issues;
