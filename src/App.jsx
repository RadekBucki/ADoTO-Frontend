import Map from "./Components/Map/Map";
import Navbar from "./Components/Navbar/Navbar";

const App = () => {

  return (
    <div className="App">
      {/* <header className="App-header mb-5">
        <h1>ADoTo Map</h1>
        <a href={`/`} >Go back to landing page</a>
        <Navbar />
      </header> */}

      <div>
        <Map />
        <Navbar />
      </div>
    </div>
  );
};

export default App;
