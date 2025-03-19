import { useState } from 'react';
import PropTypes from 'prop-types';

export const ControlPanel = ({ getSearchedTodos, getSortedList }) => {
	const [searchText, setSearchText] = useState('');

	const handleSearch = (searchedText) => {
		setSearchText(searchedText);
		getSearchedTodos(searchedText);
	};

	return (
		<div className="search-bar">
			<input
				type="text"
				className="search-input"
				placeholder="Поиск"
				value={searchText}
				onChange={(e) => handleSearch(e.target.value)}
			/>

			<button className="sort-button" onClick={getSortedList} />
		</div>
	);
};

ControlPanel.propTypes = {
	getSearchedTodos: PropTypes.func.isRequired,
	getSortedList: PropTypes.func.isRequired,
};
