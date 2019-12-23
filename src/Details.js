import React from "react";
import DetailsTop from "./DetailsTop";
import DetailsBottom from "./DetailsBottom";
const Details = props => {
  return (
    <div className="wrapper">
      <DetailsTop
        temperature={props.temperature}
        humidity={props.humidity}
        windSpeed={props.windSpeed}
        visibility={props.visibility}
        predictability={props.predictability}
        pressure={props.pressure}
      />
      <DetailsBottom
        minTemperatures={props.minTemperatures}
        maxTemperatures={props.maxTemperatures}
        date={props.date}
        icons={props.icons}
      />
    </div>
  );
};

export default Details;
