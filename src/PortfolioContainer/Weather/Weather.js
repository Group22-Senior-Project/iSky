import React from 'react';
import ScreenHeading from '../../utilities/ScreenHeading/ScreenHeading';
import ScrollService from '../../utilities/ScrollService';
import Animations from '../../utilities/Animations';
import './Weather.css';

// npm i axios

export default function Weather(props) {
   // Scrolling Animation
   // let fadeInScreenHandler = (screen) => {
   //    if (screen.fadeInScreen !== props.id) return;
   //    Animations.animations.fadeInScreen(props.id);
   // };

   // const fadeInSubscription =
   //    ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);

   return (
      <div className="weather-container screen-container" id={props.id || ''}>
         <div className="weather-parent">
            <ScreenHeading
               title={'Weather'}
               // subHeading={'This is the Weather'}
            />
         </div>

         {/* Sample div */}
         <div className="weather-app">

            <div className="weather-app-container">
               {/* Top Part */}
               <div className="weather-top">
                  <div className="weather-location">
                     <p>
                        {props.data.name}
                        {props.data.sys ? <p>{props.data.sys.country}</p> : null}
                     </p>
                  </div>

                  <div className="weather-temp">
                     {props.data.main ? <h1>{props.data.main.temp.toFixed()}ºF</h1> : null}
                  </div>

                  <div className="report">
                     {props.data.weather ? <p>{props.data.weather[0].main}</p> : null}
                  </div>

                  <div className="weather-description">
                     {props.data.weather ? (
                        <h5>
                           {props.data.weather[0].description
                              .charAt(0)
                              .toUpperCase() +
                              props.data.weather[0].description.slice(1)}
                        </h5>
                     ) : null}
                  </div>

                  <div className="weather-icon">
                     {props.data.weather ? (
                        <img
                           src={`http://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`}
                           alt="icon"
                        />
                     ) : null}
                  </div>
               </div>

               {/* Bottom Part */}
               {props.data.name !== undefined && (
                  <div className="weather-bottom">
                     <div className="weather-feels">
                        {props.data.main ? (
                           <p>{props.data.main.feels_like.toFixed()}ºF</p>
                        ) : null}
                        <p>Feels Like</p>
                     </div>

                     <div className="weather-humidity">
                        {props.data.main ? <p>{props.data.main.humidity}%</p> : null}
                        <p>Humidity</p>
                     </div>

                     <div className="weather-wind">
                        {props.data.wind ? (
                           <p>{props.data.wind.speed.toFixed()} MPH</p>
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
