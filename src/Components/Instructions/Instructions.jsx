import classes from './Instructions.module.css';
import { Link } from 'react-router-dom';

const Instructions = () => {

    return (
        <div className='mb-4'>
            <h1>How to do it?</h1>
            <ol className={classes.li_elements}>
                <li>Go to map <Link to="/map" className={`${classes.map_button} mx-2 btn btn-sm`}>Map</Link></li>
                <li>Select the desired area to see the outline of</li>
                <li>Press the button to retrieve the image of the selected area</li>
                <li>Choose the type of area to be outlined: building, river, road, forest</li>
                <li>Press the button to see the outlines on the result image</li>
                <li>Voila, admire the achieved outlines of your choosen area!</li>
            </ol>
        </div>
    );
}

export default Instructions