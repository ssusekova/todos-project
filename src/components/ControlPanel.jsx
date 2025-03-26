import PropTypes from 'prop-types';

export const ControlPanel = ({ isSorting, setIsSorting, searchText, setSearchText }) => {
	return (
		<div className="search-bar">
			<input
				type="text"
				className="search-input"
				placeholder="Поиск"
				value={searchText}
				onChange={(e) => setSearchText(e.target.value)}
			/>

			<button className="sort-button" onClick={() => setIsSorting(!isSorting)} />
		</div>
	);
};

ControlPanel.propTypes = {
	isSorting: PropTypes.bool.isRequired,
	setIsSorting: PropTypes.func.isRequired,
	searchText: PropTypes.string.isRequired,
	setSearchText: PropTypes.func.isRequired,
};
