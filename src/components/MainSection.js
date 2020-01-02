import React from "react";

const MainSection = props => {
  "sn-SNOW";
  "sl-SLEET";
  "h-HAIL";
  "t-THUNDERSTORM";
  "hr-HEAVYRAIN";
  "lr-LIGHTRAIN";
  "s-SHOWERS";
  "hc-HEAVYCLOUD";
  "lc-LIGHTCLOUD";
  "c-CLEAR";

  return (
    <>
      {props.showComponent ? (
        <>
          <div className="main-section">
            <div className="left-side">
              <div className="icon-and-sign">
                {/* <WiSnow /> */}
                <i className="details-icons">{props.icon}</i>
                <p>{props.weatherName}</p>
              </div>
              <div className="main-temperature">
                <p>{props.temperature}°C</p>
              </div>
            </div>

            <div className="right-side">
              <p className="maximal-temperature">{props.minTemperature}</p>
              <div className="line" />
              <p className="minimal-temperature">{props.maxTemperature}</p>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default MainSection;
