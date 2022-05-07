import React, { useEffect, useState } from 'react';
import { TOTAL_SCREENS } from '../utilities/commonUtils';
import { toast, ToastContainer } from 'react-toastify';

import {
   getWeather,
   fetchData,
   fetchNewConfirmed,
   fetchGlobalData,
   getPlacesData,
   getCityList,
   getHistoricalWeather,
} from '../api';

import Cards from './Corona/Cards.jsx';
import Chart from './Corona/Chart.jsx';
import List from './Interest/List/List.jsx';

import './WebsiteContainer.css';
import 'react-toastify/dist/ReactToastify.css';
import WeatherList from './WeatherHistorical/WeatherList/WeatherList';

export default function WebsiteContainer() {
   // Sets a const for every component from
   // the component array in commonUtils.js
   const Home = TOTAL_SCREENS[0];
   const Map = TOTAL_SCREENS[1];
   const Interest = TOTAL_SCREENS[2];
   const Weather = TOTAL_SCREENS[3];
   const Corona = TOTAL_SCREENS[4];

   // -- OpenWeatherMap API consts --
   // data is the OpenWeatherMap json
   // and location is the user's input in the search bar
   const [data, setData] = useState({});
   const [location, setLocation] = useState('');

   // -- Historical OpenWeatherMap API consts --
   // Start date of planned trip to a location
   const [startDate, setStartDate] = useState('');

   // Start date of planned trip in unix format as it
   // is need to call the historical data function
   const [startDateUnix, setStartDateUnix] = useState('');

   // The array of 8 days a year ago from a user's date input
   const [historicalWeekDataArr, setHistoricalWeekDataArr] = useState([]);

   // -- mathdroid's corona API consts --
   // Covid Data and Country
   // country is the country of the city a user selected
   const [country, setCountry] = useState(' ');
   const [covidData, setCovidData] = useState({});

   // -- about-corona API consts --
   // Daily New Covid Data
   // dailyCovidDataList is an array containing last 30 days of Covid data
   // dailyCovidData is the covid data of most recent day
   const [dailyCovidDataList, setDailyCovidDataList] = useState([]);
   const [dailyCovidData, setDailyCovidData] = useState();

   // Sets variables and the update functions
   // for longitude and latitude
   // default variables are within useState parentheses
   // and are set to San Jose's coordinates
   const [lat, setLat] = useState(37.3382);
   const [lon, setLon] = useState(-121.8863);

   // -- TravelAdvisor API consts --
   // Sets variables for places of interest
   // is an array of places
   const [places, setPlaces] = useState([]);

   // Sets variables for filters of places
   const [placeType, setPlaceType] = useState('restaurants');

   // This function loads the first thing the page loads
   // (since array in the bottom of function is empty)
   // creates a asynchornous function which
   // calls the fetchData() function from index.js
   // and sets the intial Covid data for the cards and chart
   useEffect(() => {
      const loadAPI = async () => {
         // mathdroid's Corona api
         const APIData = await fetchData();
         // console.log(APIData);
         setCovidData(APIData);

         // array of about-corona's api
         const globalDaily = await fetchGlobalData();

         // Sets today's recent Covid Data which is the
         // first element in the array
         setDailyCovidData(globalDaily[0].confirmed);

         // Reverses the array so the last element
         // is the most recent day
         // setDailyCovidDataList(globalDaily);
         const reverse_globalDaily = globalDaily.reverse();
         setDailyCovidDataList(reverse_globalDaily);
         // console.log(reverse_globalDaily);

         const placesData = await getPlacesData(placeType, lat, lon);

         // console.log(placesData);
         // Filter array to remove ads
         try {
            const filtPD = placesData.filter((place) => place.name && place.num_reviews > 0);
            setPlaces(filtPD);
         } catch (error) {
            console.log(error)
         }
         // console.log(filtPD);
      };

      loadAPI();
   }, []);

   // Function runs whenever placeType changes
   useEffect(() => {
      const loadFiltered = async () => {
         try {
            const gpd = await getPlacesData(placeType, lat, lon);
            const filtered = gpd.filter((place) => place.name && place.num_reviews > 0);
            setPlaces(filtered)
         } catch (error) {
            console.log(error)
         }
      }
      loadFiltered();
   }, [placeType]);

   // Fetches and sets the covid data of a country
   // using mathdroid's covid api
   const getAndSetCountryData = async (country) => {
      const gd = await fetchData(country);
      // console.log(gd);
      setCovidData(gd);
   };

   // Searches OpenWeatherMap, calls other functions
   // which get or set data with the country of inputted city
   const searchLocation = async (event) => {
      if (event.key === 'Enter') {
         try {
            // const location_arr = location.split(/[ ,]+/);
            // console.log(location_arr);
            const weatherData = await getCityList(location);
            // const weatherData = await getCityList(location_arr[0], location_arr[1]);

            // Sets OpenWeatherMap data
            setData(weatherData.data);
            console.log(weatherData.data);

            // Sets Latitude and Longitude for maps
            setLat(weatherData.data.coord.lat);
            setLon(weatherData.data.coord.lon);

            // Sets the country and country covid data for
            // covid cards and chart
            setCountry(weatherData.data.sys.country);
            getAndSetCountryData(weatherData.data.sys.country);

            // Sets the country's daily confirmed covid cases and deaths
            getCountryDailyCovidData(weatherData.data.sys.country);

            // Calls the get places function with updated
            // coordinates
            getNewPlaces(
               'restaurants',
               weatherData.data.coord.lat,
               weatherData.data.coord.lon
            );

            // Resets the search text to ''
            setLocation('');

            // Calls the historicalWeatherCaller function in this js file
            // to have error handling
            historicalWeatherCaller(
               weatherData.data.coord.lat,
               weatherData.data.coord.lon,
               startDateUnix
            );
         } catch (error) {
            // console.log(error)
            toast.error('City not found. \n Please input a valid city', {
               position: 'top-center',
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });
         }
      }
   };

   // Sets the start date to the selected value
   // Also converts the date to unix format
   const handleStartDateChange = (event) => {
      setStartDate(event);
      console.log(event);

      // Convert date to unix format
      const dateStr = new Date(event);
      const unixTime = Math.floor(dateStr.getTime() / 1000);
      setStartDateUnix(unixTime);
      console.log(unixTime);
   };

   // Calls getHistoricalWeather() function in index.js with error handling
   const historicalWeatherCaller = async (lat, lon, startDateUnix) => {
      try {
         const historicalData = await getHistoricalWeather(
            lat,
            lon,
            startDateUnix
         );
         setHistoricalWeekDataArr(historicalData);
         // console.log(historicalWeekDataArr);

         // error handling since catching does not work for some reason
         if (typeof historicalData == 'undefined') {
            toast.error('Please input a future date', {
               position: 'top-center',
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });
         }
      } catch (error) {
         console.log(error);
      }
   };

   // Gets a country's daily covid data array
   // and the current daily covid cases.
   // It sets the const DailyCovidDataList to the array.
   // Also sets the daily covid cases which is
   // the first element of that array.
   const getCountryDailyCovidData = async (country) => {
      const daily_data = await fetchNewConfirmed(country);
      // console.log(daily_data)
      setDailyCovidData(daily_data[0].confirmed);

      const reverse_globalDaily = daily_data.reverse();
      setDailyCovidDataList(reverse_globalDaily);
   };

   const getNewPlaces = async (type, lat, lon) => {
      try {
         const placesData = await getPlacesData(type, lat, lon);
         const filtPD = placesData.filter((place) => place.name && place.num_reviews > 0);
         setPlaces(filtPD);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div className="app">
         <Home.component
            screenName={Home.screen_name}
            key={Home.screen_name}
            id={Home.screen_name}
         />

         <div className="search">
            <div className="location">
               <label>Enter Location:</label> <br />
               <input
                  type="text"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  onKeyPress={searchLocation}
                  placeholder="City, State/Country"
               />
            </div>

            <div className="start">
               <label id="date">Enter Start Date:</label> <br />
               <input
                  type="date"
                  value={startDate}
                  onChange={(event) =>
                     handleStartDateChange(event.target.value)
                  }
                  onKeyPress={searchLocation}
               />
            </div>
         </div>

         {/* <div className="labels">
            <label id='location'>Enter Location:</label>
            <label id='date'>Enter Start Date:</label>
         </div> */}

         {/* <div className="search">
            <input
               type="text"
               value={location}
               onChange={(event) => setLocation(event.target.value)}
               onKeyPress={searchLocation}
               placeholder="City, State/Country"
            />
            <input 
               type="date"
               value={startDate}
               onChange={(event) => handleStartDateChange(event.target.value)}
               onKeyPress={searchLocation}
            />
         </div> */}
         {/* Conditional rendering for ity name and ity Country 
             if there is a city name, render city name and city country*/}
         <div className="city-name">
            {data.name ? (
               <div>
                  {data.name}, {data.sys.country}
               </div>
            ) : (
               <div></div>
            )}
         </div>
         <Map.component
            screenName={Map.screen_name}
            key={Map.screen_name}
            id={Map.screen_name}
            lat={lat}
            lon={lon}
         />
         <Interest.component
            screenName={Interest.screen_name}
            key={Interest.screen_name}
            id={Interest.screen_name}
         />
         <List
            places={places}
            placeType={placeType}
            setPlaceType={setPlaceType}
         />
         <Weather.component
            screenName={Weather.screen_name}
            key={Weather.screen_name}
            id={Weather.screen_name}
            data={data}
         />
         <WeatherList historicalWeekDataArr={historicalWeekDataArr} />

         <Corona.component
            screenName={Corona.screen_name}
            key={Corona.screen_name}
            id={Corona.screen_name}
         />
         <Cards
            data={covidData}
            country={country}
            daily={dailyCovidData}
         ></Cards>
         <Chart data={dailyCovidDataList} country={country}></Chart>
         <div className="tc">
            <ToastContainer></ToastContainer>
         </div>
      </div>
   );
}
