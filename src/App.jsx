import { useState } from 'react';
import './index.css';
import { TodosList } from './components/TodosList';
import { ControlPanel } from './components/ControlPanel';
import { useRequestGetTodos } from './hooks';
import { getSortedTodos, getSearchedTodos } from './utils';

export const App = () => {
	const [sortedTodos, setSortedTodos] = useState([]);
	const [searchInfo, setSearchInfo] = useState({});
	const [isSorting, setIsSorting] = useState(false);

	const { todos, isLoading, refreshTodoList } = useRequestGetTodos();

	const getSortedList = () => {
		setIsSorting(isSorting ? false : true);
		console.log('isSorting', isSorting);

		setSortedTodos(getSortedTodos(todos, isSorting));
	};

	const getSearchInfo = (searchText) => {
		const { isSearching, searchedTodos } = getSearchedTodos(todos, searchText);
		setSearchInfo({ isSearching, searchedTodos });
	};

	const todoList = sortedTodos.length > 0 ? sortedTodos : todos;

	return (
		<>
			<h1 className="app-title">Список дел</h1>
			<ControlPanel
				getSearchedTodos={getSearchInfo}
				getSortedList={getSortedList}
			/>
			<TodosList
				todos={todoList}
				isLoading={isLoading}
				refreshTodoList={refreshTodoList}
				searchInfo={searchInfo}
			/>
		</>
	);
};
