import classes from './Landing.module.css';
import Navbar from "../Navbar/Navbar";
import ImageCarousel from "../ImageCarousel/ImageCarousel";

function Landing() {

return (
    <div className={classes.landing}>
        <img src="\src\assets\globe_img.avif"  height={1080} style={{objectFit: 'cover', width: '100%', height: '100vh'}}></img>
        <Navbar/>

        <div className={classes.welcome_text}>
          <span className={classes.welcome_line}>WELCOME</span>
          <span className={classes.welcome_line}>TO</span>
          <span className={classes.welcome_line}>ADoTO</span>
        </div>

        <h1>What is ADoTO?</h1>
        <p>Automatic Detection of Topographic Objects (ADoTO) is a project aimed at developing a system for the automatic detection of topographic objects. The goal of this project is to create tools based on machine learning algorithms that enable the automatic detection of topographic objects such as buildings, structures, roads, rivers, fields, and forests. The detected objects will be accurately located and their data will be stored in a database. The automatic detection process will rely on photogrammetric data, such as those available in the national geodetic and cartographic resources.</p>
        <ImageCarousel/>
    </div>
);
}

export default Landing