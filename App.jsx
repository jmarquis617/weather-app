import React, { useState, useEffect } from 'react';
import moment from 'moment';

function App(){
    const [weather, setWeather] = useState({}); // Store response from weather API
    const [locations, setLocations] = useState([]); // Store response from user's input
    const [photos, setPhotos] = useState([]);   // Store photos from unsplash API

    useEffect(() => {
        ifClicked();
    }, []);

    function ifClicked(){

        // Fetch data from the WEATHER API
        fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${locations}&APPID=f7deec8306fd45d0ac5113cf58df4efd&units=metric`
        )

        // Check validity of user input
        .then((res) => {
            if(res.ok){
                console.log(res.status);
                return res.json();  // Return json data from API
            } else{
                if(res.status === 404){
                    return alert("Oops, there seems to be an error!(Wrong location)");
                }
                throw new Error("You have an error");
            }
        })

        // Set object response from API to the weather piece of state
        .then((object) => {
            setWeather(object);
            console.log(weather);
        })
        .catch((error) => console.log(error));

        
        // Fetch data from the PHOTO API
        fetch(            
            `https://api.unsplash.com/search/photos?query=${locations}&client_id=xPWP8sDIh3qlUbsLk2OP98hhMi9qQ0zyih21VzC8_MM`
        )
        .then((res) => {
            if(res.ok){
                return res.json();  // Return json data from API
            } else{
                throw new Error("You made a mistake");
            }
        })

        // Set object response from API to the photo piece of state
        .then((data) => {
            console.log(data);
            setPhotos(data?.results[0]?.urls?.raw);
        })
        .catch((error) => console.log(error));

    }

    return(
        <div className="app">
            <div className="wrapper">
                <div className="search">
                    <input
                        type="text"
                        value={locations}
                        onChange={(e) => setLocations(e.target.value)}
                        placeholder="Enter location"
                        className="location-input"
                    />
                    <button className="location-searcher" onClick={ifClicked}>
                        Search Location
                    </button>
                </div>
                <div className="app-data">
                    <p className="temp">Current Temperature: {weather?.main?.temp} &deg;C</p>                  
                </div>
                <img className="app-image" src={photos} alt="" />
            </div>
        </div>
    );
}

export default App;