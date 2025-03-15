export const getSortedTodos = (todos, isSorting) => {
	if (!isSorting) {
		return [];
	}

	return [...todos].sort((a, b) =>
		a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
	);
};

export const getSearchedTodos = (todos, searchText) => {
	if (!searchText) {
		return { isSearching: false, searchedTodos: [] };
	}

	const filteredTodos = todos.filter((todo) =>
		todo.title.toLowerCase().includes(searchText.toLowerCase()),
	);
	return { isSearching: true, searchedTodos: filteredTodos };
};
