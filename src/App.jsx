import Map from "./Components/Map/Map";
import Navbar from "./Components/Navbar/Navbar";

const App = () => {

  return (
    <div className="App">
      <div className="container-fluid">
        <Map />
        <Navbar />
      </div>
    </div>
  );
};

export default App;
