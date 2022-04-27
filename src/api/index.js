import axios from "axios";

const url = "https://covid19.mathdro.id/api";
const about_corona_url = "https://corona-api.com"
const t_advisor =
   'https://travel-advisor.p.rapidapi.com';

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
              'ec2673bc82msh527abdac9b56892p123508jsn009f5ddbae70',
        },
     });

     return data;
  } catch (error) {
     console.log(error);
  }
};
