import { Routes, Route, Navigate } from 'react-router';
import { useState } from 'react';
import './index.css';
import { TodosList } from './components/TodosList';
import { TodoItem } from './components/TodoItem';
import { ControlPanel } from './components/ControlPanel';
import { useRequestGetTodos } from './hooks';
import { getSortedTodos, getSearchedTodos } from './utils';

export const App = () => {
	const [sortedTodos, setSortedTodos] = useState([]);
	const [searchInfo, setSearchInfo] = useState({});
	const [isSorting, setIsSorting] = useState(false);

	const { todos, isLoading, refreshTodoList } = useRequestGetTodos();

	const getSortedList = () => {
		const newIsSorting = !isSorting;
		setIsSorting(newIsSorting);
		setSortedTodos(getSortedTodos(todos, newIsSorting));
	};
	const getSearchInfo = (searchText) => {
		const { isSearching, searchedTodos } = getSearchedTodos(todos, searchText);
		setSearchInfo({ isSearching, searchedTodos });
	};

	const todoList = sortedTodos.length > 0 ? sortedTodos : todos;

	const NotFound = () => (
		<div className="info-message">Такая страница не существует</div>
	);
	const LoadError = () => (
		<div className="info-message">
			Упс, не удалось загрузить запрашиваемую информацию
		</div>
	);

	return (
		<Routes>
			<Route
				path="/"
				element={
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
				}
			/>
			<Route
				path="task/:id"
				element={<TodoItem refreshTodoList={refreshTodoList} />}
			/>
			<Route path="/load-error" element={<LoadError />} />
			<Route path="/404" element={<NotFound />} />
			<Route path="*" element={<Navigate to="/404" />} />
		</Routes>
	);
};
