import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import locations from './locations';
const cities = locations.sort();

const Menu = (props) => {
	return (
		<div className="wrapper search">
			<div className="search-section">
				<p>Type in your city</p>
				<Autocomplete
					id="combo-box-demo"
					onChange={props.onChange}
					options={cities}
					getOptionLabel={(cities) => cities}
					style={{
						width: '100%'
					}}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Search city"
							style={{ input: { color: 'white' } }}
							variant="outlined"
							fullWidth
						/>
					)}
				/>
				<Button variant="contained" color="primary" onClick={props.onClick}>
					Primary
				</Button>
			</div>
		</div>
	);
};

export default Menu;
