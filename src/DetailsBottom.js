import React from "react";
import { IoIosCloudOutline } from "react-icons/io";

const Details = props => {
  return (
    <div className="wrapper">
      <div className="details-title-and-line">
        <p className="details-title2">Next 4 days</p>
        <div className="line" />
      </div>
      <div className="days-boxes">
        <div className="days-box">
          <p>{props.date[1]}</p>
          <i className="details-icons">{props.icons[1]}</i>
          <p>{props.minTemperatures[1]}</p>
          <div className="line" />
          <p>{props.maxTemperatures[1]}</p>
        </div>
        <div className="days-box">
          <p>{props.date[2]}</p>
          <i className="details-icons">{props.icons[2]}</i>
          <p>{props.minTemperatures[2]}</p>
          <div className="line" />
          <p>{props.maxTemperatures[2]}</p>
        </div>
        <div className="days-box">
          <p>{props.date[3]}</p>
          <i className="details-icons">{props.icons[3]}</i>
          <p>{props.minTemperatures[3]}</p>
          <div className="line" />
          <p>{props.maxTemperatures[3]}</p>
        </div>
        <div className="days-box">
          <p>{props.date[4]}</p>
          <i className="details-icons">{props.icons[4]}</i>
          <p>{props.minTemperatures[4]}</p>
          <div className="line" />
          <p>{props.maxTemperatures[4]}</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
