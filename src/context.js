import { createContext } from 'react';

export const AppContext = createContext({
	todos: [],
	sortedTodos: () => {},
	searchInfo: () => {},
	dispath: () => {},
	refreshTodoList: () => {},
});
