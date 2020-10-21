import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [coords, setCoords] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const [tempUnit, setTempUnit] = useState("C");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords(pos.coords),
      (err) => console.warn(`ERROR(${err.code}): ${err.message}`)
    );
  }, []);

  useEffect(() => {
    const apiURL = `https://fcc-weather-api.freecodecamp.repl.co/api/current?lat=${coords.latitude}&lon=${coords.longitude}`;
    fetch(apiURL)
      .then((response) => response.json())
      .then((data) => setWeatherData(data));
  }, [coords]);

  const switchTempUnit = () => {
    if (tempUnit === "C") setTempUnit("F");
    else setTempUnit("C");
  };

  console.log(weatherData?.weather);
  return (
    <div className="app">
      {weatherData?.weather ? (
        <div className="app__container">
          <h1>Your Weather App</h1>
          <div className="app__locationContainer">
            <p className="app__place">{weatherData.name}</p>
            <p className="app__temp">
              {tempUnit === "C"
                ? weatherData.main.temp.toFixed(1)
                : (weatherData.main.temp * 1.8 + 32).toFixed(1)}{" "}
              <span className="app__tempSymbol">
                º{tempUnit === "C" ? "C" : "F"}
              </span>
            </p>
            <p className="app__weather">{weatherData.weather[0].main}</p>
            <img
              src={weatherData.weather[0].icon}
              alt="Icon of the current weather"
              className="app__weatherIcon"
            />
          </div>
          <button onClick={switchTempUnit} className="app__button">
            º{tempUnit === "C" ? "F" : "C"}
          </button>
          <footer>
            <em>
              Built and designed by{" "}
              <span className="app__myName">Antonio F. Gasco</span> - 2020
            </em>
          </footer>
        </div>
      ) : (
        <h1 className="app__loading">Loading...</h1>
      )}
    </div>
  );
}

export default App;
