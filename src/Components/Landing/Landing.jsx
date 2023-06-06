// import './Landing.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import classes from './Landing.module.css';

function Landing() {

return (
    
    <div className={classes.landing}>
        <h1>Welcome to ADoTo</h1>
        <h2>Click the map below to start</h2>

        <a alt="" href={`/map`} className={classes['block-icon']}>
          <img
            className={`${classes.image} m-2 shadow-sm`}
            src={
              "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1931&q=80"
            }
          />
          <FontAwesomeIcon
            color="grey"
            className={`fa-stack the-wrapper ${classes['icon-tag']}`}
            icon={faPlus}
            size="3x"
          />
        </a>
    </div>
);
}

export default Landing
