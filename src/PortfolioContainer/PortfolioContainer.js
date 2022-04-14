import React, { useState } from 'react';
import { TOTAL_SCREENS } from '../utilities/commonUtils';
import axios from 'axios';

export default function PortfolioContainer() {
   const Home = TOTAL_SCREENS[0];
   const Map = TOTAL_SCREENS[1];
   const Weather = TOTAL_SCREENS[2];
   const Corona = TOTAL_SCREENS[3];

   /* OpenWeatherMap API */
   const [data, setData] = useState({});
   const [location, setLocation] = useState('');

   // sets variables and the update functions
   // for longitude and latitude 
   // default variables are within useState parentheses
   const [lat, setLat] = useState(37.3382)
   const [lon, setLon] = useState(-121.8863)

   // const [coord, setCoord] = useState({
   //    lat: 37.3382, 
   //    lng: -121.8863
   // });

   // OpenWeatherMap API Key by city name
   // api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
   const key = '7f58ed63d7854545d442c43cba9d26af';
   let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${key}`;

   const searchLocation = (event) => {
      if (event.key === 'Enter') {
         axios.get(url).then((response) => {
            setData(response.data);
            console.log(response.data);
            // setCoord(response.data.coord)
            // console.log(response.data.coord)
            setLat(response.data.coord.lat)
            setLon(response.data.coord.lon)
         });
         // Resets the search text to ''
         setLocation('');
      }
   };


   return (<div>
      <Home.component
               screenName={Home.screen_name}
               key={Home.screen_name}
               id={Home.screen_name}
            />
      <div className="search">
        <input 
          type="text" 
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
        />
      </div>
      <Map.component
               screenName={Map.screen_name}
               key={Map.screen_name}
               id={Map.screen_name}
               // coord={coord}
               lat={lat}
               lon={lon}
            />
      <Weather.component
               screenName={Weather.screen_name}
               key={Weather.screen_name}
               id={Weather.screen_name}
               data={data}
            />
      <Corona.component
               screenName={Corona.screen_name}
               key={Corona.screen_name}
               id={Corona.screen_name}
            />
   </div>)
}
