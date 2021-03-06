import React from "react";
import Loader from "react-loader-spinner";
const LoaderSection = props => {
  return (
    <>
      <div className="loading-info">
        <Loader type="Bars" color="white" height={80} width={80} />

        <p>Loading weather app...</p>
      </div>
    </>
  );
};

export default LoaderSection;
