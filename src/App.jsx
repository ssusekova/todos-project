import { useState } from 'react';
import './index.css';
import { TodosList } from './components/TodosList';
import { ControlPanel } from './components/ControlPanel';
import { useRequestGetTodos } from './hooks';
import { getSortedTodos, getSearchedTodos } from './utils';
import { AppContext } from './context.js';

export const App = () => {
	const [sortedTodos, setSortedTodos] = useState([]);
	const [searchInfo, setSearchInfo] = useState({});

	const { todos, isLoading, refreshTodos } = useRequestGetTodos();

	const dispatch = (action) => {
		const { type, payload } = action;

		switch (type) {
			case 'SET_SORT_TODOS': {
				setSortedTodos(getSortedTodos(todos, payload));
				break;
			}
			case 'SET_SEARCH_TODOS': {
				const { isSearching, searchedTodos } = getSearchedTodos(todos, payload);
				setSearchInfo({ isSearching, searchedTodos });
				break;
			}
			default:
		}
	};

	return (
		<>
			<h1 className="app-title">Список дел</h1>
			<AppContext
				value={{ todos, sortedTodos, searchInfo, dispatch, refreshTodos }}
			>
				<ControlPanel />
				{isLoading ? <div className="loader" /> : <TodosList />}
			</AppContext>
		</>
	);
};
