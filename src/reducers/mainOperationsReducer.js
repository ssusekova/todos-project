export const mainOperationsState = {
	isLoading: false,
	isSorting: false,
	searchInput: '',
	searchPhrase: '',
};

export const mainOperationsReducer = (state = mainOperationsState, { type, payload }) => {
	switch (type) {
		case 'START_LOADING':
			return {
				...state,
				isLoading: true,
			};
		case 'END_LOADING':
			return {
				...state,
				isLoading: false,
			};
		case 'SET_SEARCH_INPUT':
			return {
				...state,
				searchInput: payload,
			};
		case 'SET_SEARCH_PHRASE':
			return {
				...state,
				searchPhrase: payload,
			};
		case 'SET_SORTING':
			return {
				...state,
				isSorting: !state.isSorting,
			};
		default:
			return state;
	}
};
