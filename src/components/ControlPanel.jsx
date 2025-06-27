import { useDispatch, useSelector } from 'react-redux';

export const ControlPanel = () => {
	const dispatch = useDispatch();
	const searchPhrase = useSelector((state) => state.mainOperationsState.searchPhrase);

	return (
		<div className="search-bar">
			<input
				type="text"
				className="search-input"
				placeholder="Поиск"
				value={searchPhrase}
				onChange={(e) =>
					dispatch({
						type: 'SET_SEARCH_PHRASE',
						payload: e.target.value,
					})
				}
			/>

			<button
				className="sort-button"
				onClick={() =>
					dispatch({
						type: 'SET_SORTING',
					})
				}
			/>
		</div>
	);
};
