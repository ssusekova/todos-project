import { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../context.js';

export const ControlPanel = () => {
	const { dispatch } = useContext(AppContext);

	const [searchText, setSearchText] = useState('');
	const [isSorting, setIsSorting] = useState(false);

	const handleSearch = (searchedText) => {
		setSearchText(searchedText);
		dispatch({ type: 'SET_SEARCH_TODOS', payload: searchedText });
	};

	const handleSort = () => {
		const newIsSorting = !isSorting;
		setIsSorting(newIsSorting);
		dispatch({ type: 'SET_SORT_TODOS', payload: newIsSorting });
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

			<button className="sort-button" onClick={handleSort} />
		</div>
	);
};
