import React from 'react';
import { IoIosCloudOutline } from 'react-icons/io';

const Details = (props) => {
	return (
		<>
			<div className="details-title-and-line">
				<p className="details-title2">Next 4 days</p>
				<div className="line" />
			</div>
			<div className="days-boxes">
				{props.icons.map((element, index) => (
					<div className="days-box">
						<p>{props.date[index + 1]}</p>
						<i className="details-icons">{props.icons[index + 1]}</i>
						<p>{props.minTemperatures[index + 1]}</p>
						<div className="line" />
						<p>{props.maxTemperatures[index + 1]}</p>
					</div>
				))}
			</div>
		</>
	);
};

export default Details;
