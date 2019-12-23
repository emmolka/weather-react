import React from "react";
import { IoIosEye, IoMdSpeedometer } from "react-icons/io";

import { WiStrongWind, WiThermometer, WiHumidity } from "react-icons/wi";
import { TiPlusOutline, TiMinusOutline } from "react-icons/ti";

const DetailsTop = props => {
  return (
    <div className="wrapper">
      <div className="details-title-and-line">
        <p className="details-title">Details</p>
        <div className="line" />
      </div>
      <div className="box-wrapper">
        <div className="details-box">
          <WiThermometer className="details-icons" />
          <p>Feels like</p>
          <p>{props.temperature}</p>
        </div>
        <div className="details-box">
          <WiStrongWind className="details-icons" />
          <p>Wind</p>
          <p>{props.windSpeed}</p>
        </div>
        <div className="details-box">
          <WiHumidity className="details-icons" />
          <p>Humidity</p>
          <p>{props.humidity}</p>
        </div>
      </div>
      <div className="box-wrapper">
        <div className="details-box">
          <IoIosEye className="details-icons" />
          <p>Visibility</p>
          <p>{props.visibility}</p>
        </div>
        <div className="details-box">
          <IoMdSpeedometer className="details-icons" />
          <p>Pressure</p>
          <p>{props.pressure}</p>
        </div>
        <div className="details-box">
          <div className="confidence-icons">
            <TiPlusOutline className="details-icons" />
            <TiMinusOutline className="details-icons" />
          </div>
          <p>Confidence</p>
          <p>{props.predictability}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailsTop;
