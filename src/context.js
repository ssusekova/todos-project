import { createContext } from 'react';

export const AppContext = createContext({
	todos: [],
	isLoading: false,
	refreshTodoList: () => {},
});
