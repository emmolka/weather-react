import React from "react";
import { Line } from "react-chartjs-2";
const Chart = props => {
  const data = {
    labels: [
      "today",
      props.date[1],
      props.date[2],
      props.date[3],
      props.date[4]
    ],
    datasets: [
      {
        pointStyle: "circle",
        pointBorderColor: "white",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: props.temperatures,
        borderWidth: 1,
        borderColor: "white",
        color: "white"
      }
    ]
  };
  const options = {
    scales: {
      yAxes: [
        {
          gridLines: {
            display: false
          },
          ticks: {
            fontColor: "white",
            fontSize: 12,
            stepSize: 2
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            fontColor: "white",
            fontSize: 12,
            stepSize: 1
          }
        }
      ]
    },
    legend: {
      position: "none"
    },
    layout: {
      padding: {
        right: 0,
        left: 10,
        bottom: 20
      }
    }
  };
  return (
    <>
      {props.showComponent ? (
        <Line data={data} height={500} width={700} options={options} />
      ) : (
        <></>
      )}
    </>
  );
};

export default Chart;
