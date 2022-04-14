import React, { useState } from 'react';
import ScreenHeading from '../../utilities/ScreenHeading/ScreenHeading';
import ScrollService from '../../utilities/ScrollService';
import Animations from '../../utilities/Animations';
import './Weather.css';
import axios from 'axios';

// npm i axios

export default function Weather(props) {
   // Scrolling Animation
   let fadeInScreenHandler = (screen) => {
      if (screen.fadeInScreen !== props.id) return;
      Animations.animations.fadeInScreen(props.id);
   };

   const fadeInSubscription =
      ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);

   /* OpenWeatherMap API */
   const [data, setData] = useState({});
   const [location, setLocation] = useState('');

   // OpenWeatherMap API Key by city name
   // api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
   const key = '7f58ed63d7854545d442c43cba9d26af';
   let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${key}`;

   const searchLocation = (event) => {
      if (event.key === 'Enter') {
         axios.get(url).then((response) => {
            setData(response.data);
            console.log(response.data);
         });
         setLocation('');
      }
   };

   return (
      <div className="weather-container screen-container" id={props.id || ''}>
         <div className="weather-parent">
            <ScreenHeading
               title={'Weather'}
               subHeading={'This is the Weather'}
            />
         </div>

         {/* Sample div */}
         <div className="weather-app">
            {/* Search Function */}
            <div className="weather-search">
               <input
                  type="text"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  onKeyPress={searchLocation}
                  placeholder="Enter Location"
               />
            </div>

            <div className="weather-app-container">
               {/* Top Part */}
               <div className="weather-top">
                  <div className="weather-location">
                     <p>
                        {data.name}
                        {data.sys ? <p>{data.sys.country}</p> : null}
                     </p>
                  </div>

                  <div className="weather-temp">
                     {data.main ? <h1>{data.main.temp.toFixed()}ºF</h1> : null}
                  </div>

                  <div className="report">
                     {data.weather ? <p>{data.weather[0].main}</p> : null}
                  </div>

                  <div className="weather-description">
                     {data.weather ? (
                        <h5>
                           {data.weather[0].description
                              .charAt(0)
                              .toUpperCase() +
                              data.weather[0].description.slice(1)}
                        </h5>
                     ) : null}
                  </div>

                  <div className="weather-icon">
                     {data.weather ? (
                        <img
                           src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                           alt="icon"
                        />
                     ) : null}
                  </div>
               </div>

               {/* Bottom Part */}
               {data.name !== undefined && (
                  <div className="weather-bottom">
                     <div className="weather-feels">
                        {data.main ? (
                           <p>{data.main.feels_like.toFixed()}ºF</p>
                        ) : null}
                        <p>Feels Like</p>
                     </div>

                     <div className="weather-humidity">
                        {data.main ? <p>{data.main.humidity}%</p> : null}
                        <p>Humidity</p>
                     </div>

                     <div className="weather-wind">
                        {data.wind ? (
                           <p>{data.wind.speed.toFixed()} MPH</p>
                        ) : null}
                        <p>Wind Speed</p>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}
