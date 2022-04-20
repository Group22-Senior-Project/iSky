import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import 'chart.js/auto';
import styles from "./Chart.module.css";

const Chart = (props) => {

  let lineChart;

  // const [dailyData, setDailyData] = useState([]);
  // const [data, setData] = useState(props.data);

  const data = props.data

  // useEffect(() => {
  //   const fetchAPI = async () => {
  //     setDailyData(await fetchDailyData());
  //   };
  //   fetchAPI();
  // }, []);

  if(data) {
  lineChart = data.length ? (
    <div>
      <Line
        data={{
          labels: data.map(({ date }) => date),
          datasets: [
            {
              data: data.map(({ confirmed }) => confirmed),
              label: "Daily Confirmed Cases",
              borderColor: "#3333ff",
              fill: true,
            },
          ],
        }}
      />
      <Line
      data={{
          labels: data.map(({ date }) => date),
          datasets: [
            {
              data: data.map(({ deaths }) => deaths),
              label: "Daily Deaths",
              borderColor: "red",
              backgroundColor: "rgba(255,0,0,0.5)",
              fill: true,
            },
          ],
        }}
      />
    </div>
  ) : null;
    }

  // const barChart = confirmed ? (
  //   <Bar
  //     data={{
  //       labels: ["Infected", "Recovered", "Deaths", "Active"],
  //       datasets: [
  //         {
  //           label: "People",
  //           backgroundColor: [
  //             "rgba(0, 0, 255, 0.5)",
  //             "rgba(0, 255, 0, 0.5)",
  //             "rgba(255, 0, 0, 0.5)",
  //             "rgba(242, 234, 0, 0.5)",
  //           ],
  //           hoverBackgroundColor: [
  //             "rgba(0, 77, 153)",
  //             "rgba(30, 102, 49)",
  //             "rgba(255, 51, 51)",
  //             "rgba(204, 153, 0)",
  //           ],
  //           data: [
  //             confirmed.value,
  //             recovered.value,
  //             deaths.value,
  //             confirmed.value - (recovered.value + deaths.value),
  //           ],
  //         },
  //       ],
  //     }}
  //     options={{
  //       legend: { display: false },
  //       title: { display: true, text: `Current state in ${country}` },
  //     }}
  //   />
  // ) : null;

  return (
    <div className={styles.container}>{lineChart}</div>
  );
};

export default Chart;
