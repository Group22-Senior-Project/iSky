import React, { useEffect, useState } from 'react';
import { TOTAL_SCREENS } from '../utilities/commonUtils';
import axios from 'axios';

import { fetchData, fetchNewConfirmed, fetchGlobalData  } from '../api';

import Cards from './Corona/Cards.jsx';
import Chart from './Corona/Chart.jsx';

import './PortfolioContainer.css';

export default function PortfolioContainer() {
   // Sets a const for every component from
   // component array in commonUtils.js
   const Home = TOTAL_SCREENS[0];
   const Map = TOTAL_SCREENS[1];
   const Weather = TOTAL_SCREENS[2];
   const Corona = TOTAL_SCREENS[3];

   // OpenWeatherMap API consts
   // data is the OpenWeatherMap json
   // and location is the user's input in the search bar
   const [data, setData] = useState({});
   const [location, setLocation] = useState('');

   // Covid Data and Country
   // country is the country of the city a user selected
   // covidData is the mathdroid corona api json
   const [country, setCountry] = useState(' ');
   const [covidData, setCovidData] = useState({});


   // Daily New Covid Data 
   // dailyCovidDataList is an array containing like over 700 days of data
   // dailyCovidData is a day of covid data
   const [dailyCovidDataList, setDailyCovidDataList] = useState([]);
   const [dailyCovidData, setDailyCovidData] = useState();

   // This function loads the first thing the page loads
   // creates a asynchornous function which
   // calls the fetchData() function from index.js
   // and sets the intial Covid data for the cards and chart
   useEffect(() => {
      const loadAPI = async () => {
         const APIData = await fetchData();
         console.log(APIData);
         setCovidData(APIData);

         const globalDaily = await fetchGlobalData();
         setDailyCovidData(globalDaily[0].confirmed);
         setDailyCovidDataList(globalDaily);
         console.log(globalDaily);
      };

      loadAPI();
   }, []);

   // Fetches and sets the covid data of a country 
   // using mathdroid's covid api
   const getAndSetCountryData = async (country) => {
      const gd = await fetchData(country);
      console.log(gd);
      setCovidData(gd);
   };

   // Sets variables and the update functions
   // for longitude and latitude
   // default variables are within useState parentheses
   const [lat, setLat] = useState(37.3382);
   const [lon, setLon] = useState(-121.8863);

   // OpenWeatherMap API Key by city name
   // api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
   const key = '7f58ed63d7854545d442c43cba9d26af';
   let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${key}`;

   const searchLocation = (event) => {
      if (event.key === 'Enter') {
         axios.get(url).then((response) => {
            // sets OpenWeatherMap data
            setData(response.data);
            console.log(response.data);

            // sets Latitude and Longitude for maps
            setLat(response.data.coord.lat);
            setLon(response.data.coord.lon);

            // sets the country and country covid data for
            // covid cards and chart
            setCountry(response.data.sys.country);
            getAndSetCountryData(response.data.sys.country);

            getCountryDailyCovidData(response.data.sys.country)
         });
         // Resets the search text to ''
         setLocation('');
      }
   };

   // Gets a country's daily covid data array 
   // and the current daily covid cases.
   // It sets the const DailyCovidDataList to the array.
   // Also sets the daily covid cases which is 
   // the first element of that array.
   const getCountryDailyCovidData = async (country) => {
      const daily_data = await fetchNewConfirmed(country)
      // console.log(daily_data)
      setDailyCovidDataList(daily_data)
      setDailyCovidData(daily_data[0].confirmed)
      console.log(daily_data[0].confirmed)
    }

   return (
      <div>
         <Home.component
            screenName={Home.screen_name}
            key={Home.screen_name}
            id={Home.screen_name}
         />
         <div className="search">
            <input
               type="text"
               value={location}
               onChange={(event) => setLocation(event.target.value)}
               onKeyPress={searchLocation}
               placeholder="City, State/Country"
            />
            <input type="date" />
            <input type="date" />
         </div>
         <Map.component
            screenName={Map.screen_name}
            key={Map.screen_name}
            id={Map.screen_name}
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
         <Cards data={covidData} country={country} daily={dailyCovidData}></Cards>
         <Chart data={dailyCovidDataList} country={country}></Chart>
      </div>
   );
}
