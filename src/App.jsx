import Map from "./Components/Map/Map";

const App = () => {

  return (
    <div className="App">
      <header className="App-header">
        <h1>ADoTo Map</h1>
        <a href={`/`} >Go back to landing page</a>
      </header>
      <div className="container-fluid">
        <Map />
      </div>
    </div>
  );
};

export default App;
