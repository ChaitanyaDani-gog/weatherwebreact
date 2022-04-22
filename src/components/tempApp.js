/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import debounce from "lodash.debounce"
import "./css/style.css";

// https://api.openweathermap.org/data/2.5/weather?q=london&appid=6a637c7cc165ebd6d40d22c7558ed68c

const TempApp = () => {
  const localData = () =>{
    const localData = localStorage.getItem('search')
    return localData ? JSON.parse(localData) : []
  }

  const [city, setCity] = useState(null);
  const [search, setSearch] = useState(localData.value);
  

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=6a637c7cc165ebd6d40d22c7558ed68c`;
      const response = await fetch(url);
      const jsonRes = await response.json();
      // console.log(jsonRes)
      setCity(jsonRes.main);
      localStorage.setItem('search',JSON.stringify(search))
    };

    fetchApi();
  }, [search]);

    const updateSearch = e =>setSearch(e?.target?.value)

    const debouncedonChange = debounce(updateSearch, 400)
  return (
    <>
      <div className="temp-app-box text-center">
        <h1 className="app-title">Weather Web</h1>

        <div className="input-box">
          <input type="search" className="search-bar" onChange={debouncedonChange}/>
        </div>
        {!city ? (
          <p style={{color: 'white'}}>No city found.</p>
        ) : (
          <div className="display-temp-info">
            <div>
              <h4 className="place-name">{search}</h4>
            </div>
            
            <h1 className="temp-num">{city.temp}°C</h1>
            <h6 className="temp-details">Min: {city.temp_min}°C | Max: {city.temp_max}°C</h6>
            <h6 className="temp-details">Feels Like: {city.feels_like}°C</h6>
            <h6 className="temp-details">Humidity: {city.humidity}</h6>

          </div>
        )}
      </div>
    </>
  );
};

export default TempApp;
