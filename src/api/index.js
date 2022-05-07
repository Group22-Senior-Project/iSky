import axios from "axios";

const url = "https://covid19.mathdro.id/api";
const about_corona_url = "https://corona-api.com"

const t_advisor = "https://travel-advisor.p.rapidapi.com";

const owm_key = "7f58ed63d7854545d442c43cba9d26af";
const owm_url = "https://api.openweathermap.org/data/2.5/weather?q=";
const owm_url_lat_lon = "https://api.openweathermap.org/data/2.5/weather?";
const owm_geo_url = "https://api.openweathermap.org/geo/1.0/direct?q="; 

const owm_historical_key = "709d47814af78d6c97617012fc48b235";
const owm_historical_url = "https://history.openweathermap.org/data/2.5/history/city?";

// const iso = require('iso-3166-1');


// Uses OpenWeatherMaps' direct geocoding from location name 
// to get an array of length 5 with locations of the same name. 
// We take the first element's coordinates to call another function. 
// It calls the getCityWeatherFromLatLon which gets the weather data
// of a location by the latitude and longutide we get from geocoding by name
export const getCityList = async (location) => {
// export const getCityList = async (city, country) => {
  try {
      const cityList = await axios.get(`${owm_geo_url}${location}&limit=5&appid=${owm_key}`);
      // const cityList = await axios.get(`${owm_geo_url}${city},${country}&limit=5&appid=${owm_key}`);
      console.log(cityList.data);

      // const alpha2 = iso.whereCountry(country).alpha2

      // for (let i = 0; i < cityList.data.length; i++) {
      //   if (cityList.data[i].state == alpha2) {
      //     const cityData = await getCityWeatherFromLatLon(cityList.data[i].lat, cityList.data[i].lon);
      //     return cityData
      //   }
      // }

      const lat = cityList.data[0].lat;
      const lon = cityList.data[0].lon;
      const cityData = await getCityWeatherFromLatLon(lat, lon);
      return cityData
  } catch (error) {
    console.log(error)
  }
}

// Gets a city's current weather data from latitude and longitude coordinates
// is called from getCityList() above
export const getCityWeatherFromLatLon = async (lat, lon) => {
  try {
    const cityWeatherData = await axios.get(`${owm_url_lat_lon}lat=${lat}&lon=${lon}&appid=${owm_key}&units=imperial`);
    return cityWeatherData;

  } catch (error) {
    console.log(error);
  }
}

// Gets a city's weather data using OpenWeatherMap API
// takes in a string which is the city name
// we stopped using this method
export const getWeather = async (location) => {
  try {
    const weatherData = await axios.get(`${owm_url}${location}&units=imperial&appid=${owm_key}`);
    return weatherData;

  } catch (error) {
      console.log(error);
  };
}


export const getHistoricalWeather = async (lat, lon, startTime) => {
  try {
    // Last year is unix time minus 31,536,000 seconds
    // const lastYearStartTime = startTime - 31536000; 
    const lastYearStartTime = startTime - 31449600; 
    
    // Time after a week which is time plus 604,800 seconds
    const lastYearEndTime = lastYearStartTime + 604800

    const weatherData = await axios.get(`${owm_historical_url}&lat=${lat}&lon=${lon}&type=hour&start=${lastYearStartTime}&end=${lastYearEndTime}&appid=${owm_historical_key}&units=imperial`);
    console.log(weatherData)

    const weatherDataList = weatherData.data.list;
    const sevenDayArray = [];

    // should be 169 total entries for each hour of a week 
    // incrementing by 24 is getting different days since the json contains every hour
    for (let i = 0; i < weatherData.data.list.length; i += 24) {
      sevenDayArray.push(weatherDataList[i]);
    }
    // console.log(sevenDayArray)

    return sevenDayArray;

  } catch (error) {
    console.log(error);
  }
}

// Gets country's COVID data with mathdroid's API
export const fetchData = async (country) => {
  let changeableUrl = url;
  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableUrl);

    return {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };
  } catch (error) {
    console.log(error);
  }
};

// Gets global COVID data with mathdroid's API
export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));
    return modifiedData;
  } catch (error) {}
};

// Gets list of countries with mathdroid's API
export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);
    return countries.map((country) => country.name);
  } catch (error) {
    console.log(error);
  }
};

// Gets new confirmed cases of a country using about-corona's api
export const fetchNewConfirmed = async (country) => {
  try {
    const { data } = await axios.get(`${about_corona_url}/countries/${country}`);
    // console.log(data)

    // gets the current day covid data
    // console.log(data.data.timeline[0])
    // console.log(data.data.timeline)

    // data.data.timeline is an array of days and their respective data attributes

    // maps the json timeline data into a const 
    // slice(0,30) gets the last 31 days 
    const modifiedData = data.data.timeline.slice(0,30).map((dailyConfirmed) => ({
      confirmed: dailyConfirmed.new_confirmed,
      deaths: dailyConfirmed.new_deaths,
      date: dailyConfirmed.date,
    }));

    // console.log(modifiedData)
    return modifiedData;

  } catch (error) {
    console.log(error)
  }
};

// Gets daily covid data of a country using about-corona's api
// originally gives over 800 elements in an array which are days,
// but we cut down to 30 for the charts
export const fetchGlobalData = async () => {
  try {
    const { data } = await axios.get(`${about_corona_url}/timeline`);
    // const modifiedData = data.data[1].new_confirmed;
    // Gets the last 30 days from slicing original array 
    const modifiedData = data.data.slice(0,30).map((dailyConfirmed) => ({
      confirmed: dailyConfirmed.new_confirmed,
      deaths: dailyConfirmed.new_deaths,
      date: dailyConfirmed.date,
    }));

    // console.log(modifiedData)
    return modifiedData;

  } catch (error) {
    console.log(error)
  }
};

// New stuff 4-24
// Async Arrow Function to get the places details
// Have to manually add values to lat and lon as it would normally
// take bounds from map, but we could not in our implementation
export const getPlacesData = async (type, lat, lon) => {
  try {
     const { data: { data }, } = await axios.get(`${t_advisor}/${type}/list-in-boundary`, {
        params: {
           bl_latitude: lat - .07,
           tr_latitude: lat + .07,
           bl_longitude: lon - .07,
           tr_longitude: lon + .07,
        },
        headers: {
           'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
           'x-rapidapi-key':
              // 'ec2673bc82msh527abdac9b56892p123508jsn009f5ddbae70',
              // '0cc26afb2fmsh8b7f6e65e258f5ep15d7d6jsn9438b0d383a0',
              'd756618f9dmsh39e40ef018c3f10p1a456cjsnb7f4bfdfa360',
        },
     });

     return data;
  } catch (error) {
     console.log(error);
  }
};
