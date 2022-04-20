import axios from "axios";

const url = "https://covid19.mathdro.id/api";
const about_corona_url = "https://corona-api.com"


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

    console.log(modifiedData)
    return modifiedData;

  } catch (error) {
    console.log(error)
  }
};

export const fetchGlobalData = async () => {
  try {
    const { data } = await axios.get(`${about_corona_url}/timeline`);
    // const modifiedData = data.data[1].new_confirmed;
    const modifiedData = data.data.slice(0,30).map((dailyConfirmed) => ({
      confirmed: dailyConfirmed.new_confirmed,
      deaths: dailyConfirmed.new_deaths,
      date: dailyConfirmed.date,
    }));

    console.log(modifiedData)
    return modifiedData;

  } catch (error) {
    console.log(error)
  }
};
