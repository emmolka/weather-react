import React, { Component } from "react";
// import axios from "axios";
import Chart from "./Chart";
import Header from "./Header";
import MainSection from "./MainSection";
// import Details from "./Details";
import axios from "axios";
import DetailsTop from "./DetailsTop";
import DetailsBottom from "./DetailsBottom";
import LoaderSection from "./LoaderSection";
import Menu from "./Menu";
import {
  WiSnow,
  WiSleet,
  WiHail,
  WiThunderstorm,
  WiRain,
  WiCloudy,
  WiCloud,
  WiDaySunny
} from "react-icons/wi";
export default class Footer extends Component {
  state = {
    showMenu: false,
    showComponent: false,
    showDetails: false,
    woeid: 468739,
    date: [],
    dayName: "",
    city: "San Francisco",
    titleCity: "San Francisco",
    newCity: "",
    weatherName: "",
    weatherLetters: [],
    temperature: "",
    temperatures: [],
    minTemperatures: [],
    maxTemperatures: [],

    minTemperature: "",
    maxTemperature: "",
    humidity: "",
    windSpeed: "",
    visibility: "",
    icon: "",
    icons: []
  };
  createIcon = letters => {
    switch (letters) {
      case "sn":
        return <WiSnow />;
      case "sl":
        return <WiSleet />;
      case "h":
        return <WiHail />;
      case "t":
        return <WiThunderstorm />;
      case "hr":
        return <WiRain />;
      case "lr":
        return <WiRain />;
      case "s":
        return <WiRain />;
      case "hc":
        return <WiCloudy />;
      case "lc":
        return <WiCloud />;
      case "c":
        return <WiDaySunny />;
      default:
        console.log("xd");
    }
  };
  createDate = () => {
    const date = new Date();
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    var d = new Date(date);
    var dayName = days[d.getDay()];
    console.log(dayName);
    this.setState({ dayName: dayName });
    // const day = date.getDate();
    const day = date.getDate();
    let month = date.getMonth() + 1;

    function daysInMonth(month, year) {
      return new Date(year, month, 0).getDate();
    }
    const daysInCurrentMonth = daysInMonth(month, date.getFullYear());

    if (month < 10) {
      month = "0" + month;
    }
    const dateArray = [];
    for (let i = 0; i < 5; i++) {
      if (`${day + i}` <= daysInCurrentMonth) {
        dateArray.push(`${day + i}.${month}`);
      } else {
        dateArray.push(`${day + i - daysInCurrentMonth}.${month}`);
      }
    }

    this.setState({ date: dateArray });
  };
  toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  async getData() {
    try {
      //await

      const data2 = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${this.state.city}`
      );
      console.log(data2.data[0].woeid);

      this.setState({
        woeid: data2.data[0].woeid,
        titleCity: this.toTitleCase(this.state.city)
      });

      console.log(data2.data[0].woeid);
      console.log(this.state.city);

      // TU JEST PROBLEM !!!

      const data = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${this.state.woeid}`
      );

      console.log(data);

      this.setState({
        showComponent: true,
        weatherName: data.data.consolidated_weather[0].weather_state_name,
        weatherLetters: [
          data.data.consolidated_weather[0].weather_state_abbr,
          data.data.consolidated_weather[1].weather_state_abbr,
          data.data.consolidated_weather[2].weather_state_abbr,
          data.data.consolidated_weather[3].weather_state_abbr,
          data.data.consolidated_weather[4].weather_state_abbr
        ],

        temperature: `${Math.floor(
          data.data.consolidated_weather[0].the_temp
        )}°c`,
        temperatures: [
          Math.floor(data.data.consolidated_weather[0].the_temp),
          Math.floor(data.data.consolidated_weather[1].the_temp),
          Math.floor(data.data.consolidated_weather[2].the_temp),
          Math.floor(data.data.consolidated_weather[3].the_temp),
          Math.floor(data.data.consolidated_weather[4].the_temp),
          Math.floor(data.data.consolidated_weather[5].the_temp)
        ],
        minTemperatures: [
          Math.floor(data.data.consolidated_weather[0].min_temp),
          Math.floor(data.data.consolidated_weather[1].min_temp),
          Math.floor(data.data.consolidated_weather[2].min_temp),
          Math.floor(data.data.consolidated_weather[3].min_temp),
          Math.floor(data.data.consolidated_weather[4].min_temp)
        ],
        maxTemperatures: [
          Math.floor(data.data.consolidated_weather[0].max_temp),
          Math.floor(data.data.consolidated_weather[1].max_temp),
          Math.floor(data.data.consolidated_weather[2].max_temp),
          Math.floor(data.data.consolidated_weather[3].max_temp),
          Math.floor(data.data.consolidated_weather[4].max_temp)
        ],
        minTemperature: `${Math.floor(
          data.data.consolidated_weather[0].min_temp
        )}°c`,
        maxTemperature: `${Math.floor(
          data.data.consolidated_weather[0].max_temp
        )}°c`,
        humidity: `${Math.floor(data.data.consolidated_weather[0].humidity)}%`,
        windSpeed: `${Math.floor(
          data.data.consolidated_weather[0].wind_speed
        )} mph`,
        visibility: `${Math.floor(
          data.data.consolidated_weather[0].visibility
        )} miles`,
        pressure: `${Math.floor(
          data.data.consolidated_weather[0].air_pressure
        )}mbar`,
        predictability: `${Math.floor(
          data.data.consolidated_weather[0].predictability
        )}%`
      });
      const arrayOfIcons = [];
      this.state.weatherLetters.map(letters => {
        const icon = this.createIcon(letters);
        arrayOfIcons.push(icon);
      });
      this.setState({ icons: arrayOfIcons });
      const icon = this.createIcon(this.state.weatherLetters[0]);
      this.setState({ icon: icon });
    } catch (e) {
      alert("There is an internet error or your city is written badly");
      this.setState({ showMenu: true, showComponent: false });
    }
  }

  async componentDidMount() {
    this.createDate();
    this.getData();
  }

  render() {
    return (
      <div className="main-wrapper">
        {this.state.showComponent ? (
          <Header
            onMenuClick={() =>
              this.state.showMenu
                ? this.setState({ showMenu: false })
                : this.setState({ showMenu: true })
            }
            onPlusClick={() =>
              this.state.showDetails
                ? this.setState({ showDetails: false, showMenu: false })
                : this.setState({ showDetails: true, showMenu: false })
            }
            city={this.state.titleCity}
            date={this.state.date[0]}
          />
        ) : (
          <LoaderSection />
        )}
        {this.state.showMenu ? (
          <Menu
            onClick={() => {
              this.setState({
                showComponent: false,
                showMenu: false,
                showDetails: false
              });

              console.log(this.state.city);
              this.getData();
            }}
            onChange={event => this.setState({ city: event.target.value })}
            value={this.state.city}
          />
        ) : (
          <></>
        )}
        {this.state.showDetails ? (
          <DetailsTop
            temperature={this.state.temperature}
            humidity={this.state.humidity}
            windSpeed={this.state.windSpeed}
            visibility={this.state.visibility}
            predictability={this.state.predictability}
            pressure={this.state.pressure}
          />
        ) : (
          <MainSection
            showComponent={this.state.showComponent}
            weatherName={this.state.weatherName}
            temperature={this.state.temperature}
            maxTemperature={this.state.maxTemperature}
            minTemperature={this.state.minTemperature}
            icon={this.state.icons[0]}
          />
        )}
        {this.state.showDetails ? (
          <DetailsBottom
            minTemperatures={this.state.minTemperatures}
            maxTemperatures={this.state.maxTemperatures}
            date={this.state.date}
            icons={this.state.icons}
          />
        ) : (
          <Chart
            showComponent={this.state.showComponent}
            date={this.state.date}
            temperatures={this.state.temperatures}
          />
        )}
      </div>
    );
  }
}
