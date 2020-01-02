import React, { useEffect, useState } from 'react';
// import axios from "axios";
import Chart from './Chart';
import Header from './Header';
import MainSection from './MainSection';
import { WiSnow, WiSleet, WiHail, WiThunderstorm, WiRain, WiCloudy, WiCloud, WiDaySunny } from 'react-icons/wi';
// import Details from "./Details";
import axios from 'axios';
import DetailsTop from './DetailsTop';
import DetailsBottom from './DetailsBottom';
import LoaderSection from './LoaderSection';
import Menu from './Menu';
import Rain from '../Rain/Rain';
import locations from '../locations';
import Snow from '../Snow/Snow';
import rain from '../pictures/rain.jpg';
import snow from '../pictures/winter.jpg';
import cloudsImg from '../pictures/clouds.jpeg';
import clearImg from '../pictures/526070.jpg';

const cities = locations.sort();

const Main = () => {
	const [ showMenu, setShowMenu ] = useState(false);
	const [ showComponent, setShowComponent ] = useState(false);
	const [ showDetails, setShowDetails ] = useState(false);
	const [ date, setDate ] = useState([]);
	const [ dayName, setDayName ] = useState('');
	const [ city, setCity ] = useState('San Francisco');
	const [ snows, setSnows ] = useState(false);
	const [ rains, setRains ] = useState(false);
	const [ clouds, setClouds ] = useState(false);
	const [ clear, setClear ] = useState(false);
	const [ weatherDataObject, setWeatherDataObject ] = useState({
		titleCity: 'San Francisco',
		weatherName: '',
		humidity: '',
		windSpeed: '',
		visibility: '',
		pressure: '',
		predictability: '',
		weatherLetters: [],
		temperatures: [],
		minTemperatures: [],
		maxTemperatures: [],
		icons: []
	});

	const createIcon = (letters) => {
		switch (letters) {
			case 'sn':
				return <WiSnow />;
			case 'sl':
				return <WiSleet />;
			case 'h':
				return <WiHail />;
			case 't':
				return <WiThunderstorm />;
			case 'hr':
				return <WiRain />;
			case 'lr':
				return <WiRain />;
			case 's':
				return <WiRain />;
			case 'hc':
				return <WiCloudy />;
			case 'lc':
				return <WiCloud />;
			case 'c':
				return <WiDaySunny />;
			default:
				console.log('xd');
		}
	};
	const createDate = () => {
		const date = new Date();
		var days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];

		var d = new Date(date);
		var dayName = days[d.getDay()];
		console.log(dayName);
		setDayName(dayName);
		// const day = date.getDate();
		const day = date.getDate();
		let month = date.getMonth() + 1;

		function daysInMonth(month, year) {
			return new Date(year, month, 0).getDate();
		}
		const daysInCurrentMonth = daysInMonth(month, date.getFullYear());

		if (month < 10) {
			month = '0' + month;
		}
		const dateArray = [];
		for (let i = 0; i <= 5; i++) {
			if (`${day + i}` <= daysInCurrentMonth) {
				dateArray.push(`${day + i}.${month}`);
			} else {
				console.log();
				if (month + 1 > 12) {
					dateArray.push(`${day + i - daysInCurrentMonth}.${1}`);
				} else {
					dateArray.push(`${day + i - daysInCurrentMonth}.${month}`);
				}
			}
		}

		setDate(dateArray);
	};
	const getData = async () => {
		try {
			const data2 = await axios.get(
				`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${city}`
			);
			const cityWoeid = data2.data[0].woeid;

			const { data } = await axios.get(
				`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${cityWoeid}`
			);
			console.log(data);
			setShowComponent(true);
			const arrayOfIcons = [];
			data.consolidated_weather.map((element) => {
				const icon = createIcon(element.weather_state_abbr);
				// console.log(icon);
				arrayOfIcons.push(icon);
			});
			if (
				data.consolidated_weather[0].weather_state_abbr === 'sn' ||
				data.consolidated_weather[0].weather_state_abbr === 'sl' ||
				data.consolidated_weather[0].weather_state_abbr === 'h'
			) {
				setRains(false);
				setSnows(true);
				setClouds(false);
				setClear(false);
			} else if (
				data.consolidated_weather[0].weather_state_abbr === 'hr' ||
				data.consolidated_weather[0].weather_state_abbr === 'lr' ||
				data.consolidated_weather[0].weather_state_abbr === 's' ||
				data.consolidated_weather[0].weather_state_abbr === 't'
			) {
				setRains(true);
				setSnows(false);
				setClouds(false);
				setClear(false);
			} else if (
				data.consolidated_weather[0].weather_state_abbr === 'hc' ||
				data.consolidated_weather[0].weather_state_abbr === 'lc'
			) {
				setRains(false);
				setSnows(false);
				setClouds(true);
				setClear(false);
			} else {
				setClear(true);
				setRains(false);
				setSnows(false);
				setClouds(false);
			}

			setWeatherDataObject({
				titleCity: data.title,
				weatherName: data.consolidated_weather[0].weather_state_name,
				humidity: `${Math.floor(data.consolidated_weather[0].humidity)}%`,
				windSpeed: `${Math.floor(data.consolidated_weather[0].wind_speed)} mph`,
				visibility: `${Math.floor(data.consolidated_weather[0].visibility)} miles`,
				pressure: `${Math.floor(data.consolidated_weather[0].air_pressure)}mbar`,
				predictability: `${Math.floor(data.consolidated_weather[0].predictability)}%`,
				weatherLetters: data.consolidated_weather.map((el) => el.weather_state_abbr),
				temperatures: data.consolidated_weather.map((el) => `${Math.floor(el.the_temp)}`),
				minTemperatures: data.consolidated_weather.map((el) => `${Math.floor(el.min_temp)}°c`),
				maxTemperatures: data.consolidated_weather.map((el) => `${Math.floor(el.max_temp)}°c`),
				icons: arrayOfIcons
			});
		} catch (e) {
			alert(e);
			setShowMenu(true);
			setShowComponent(false);
		}
	};
	console.log(weatherDataObject);

	const searchInput = (event, values) => {
		setCity(values);
		console.log(event.target.value, values);
	};
	useEffect(() => {
		createDate();
		getData();
	}, []);
	console.log(rains);
	return (
		<div className="main-wrapper">
			<div
				className="bg-image"
				style={{
					backgroundImage: rains
						? `url(${rain})`
						: snows ? `url(${snow})` : clouds ? `url(${cloudsImg})` : `url(${clearImg})`
				}}
			/>
			<div
				className="wrapper"
				style={{
					backgroundColor: rains
						? '#042541c4'
						: snows ? '#006ab6ad' : clouds ? '#7bb3df' : clear ? '#f8de7ebb' : ''
				}}
			>
				{snows ? <Snow /> : null}
				{rains ? <Rain /> : null}

				{showComponent ? (
					<Header
						onMenuClick={() => (showMenu ? setShowMenu(false) : setShowMenu(true))}
						onPlusClick={() => {
							if (showDetails) {
								setShowDetails(false);
								setShowMenu(false);
							} else {
								setShowDetails(true);
								setShowMenu(false);
							}
						}}
						city={weatherDataObject.titleCity}
						date={date[0]}
					/>
				) : (
					<LoaderSection />
				)}
				{showMenu ? (
					<Menu
						onClick={() => {
							setShowComponent(false);
							setShowMenu(false);
							setShowDetails(false);
							console.log(city);
							getData();
						}}
						onChange={searchInput}
						value={cities[0]}
					/>
				) : null}
				{showDetails ? (
					<DetailsTop
						temperature={weatherDataObject.temperatures[0]}
						humidity={weatherDataObject.humidity}
						windSpeed={weatherDataObject.windSpeed}
						visibility={weatherDataObject.visibility}
						predictability={weatherDataObject.predictability}
						pressure={weatherDataObject.pressure}
					/>
				) : (
					<MainSection
						showComponent={showComponent}
						weatherName={weatherDataObject.weatherName}
						temperature={weatherDataObject.temperatures[0]}
						maxTemperature={weatherDataObject.maxTemperatures[0]}
						minTemperature={weatherDataObject.minTemperatures[0]}
						icon={weatherDataObject.icons[0]}
					/>
				)}
				{showDetails ? (
					<DetailsBottom
						minTemperatures={weatherDataObject.minTemperatures}
						maxTemperatures={weatherDataObject.maxTemperatures}
						date={date}
						icons={weatherDataObject.icons}
					/>
				) : (
					<Chart showComponent={showComponent} date={date} temperatures={weatherDataObject.temperatures} />
				)}
				{/* <Rain /> */}
			</div>
		</div>
	);
};

export default Main;
