import { useState, useEffect } from 'react';
import { TodosAPI } from '../API/TodosAPI';

export const useRequestGetTodos = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [searchText, setSearchText] = useState('');
	const [isSorting, setIsSorting] = useState(false);

	useEffect(() => {
		getAllTodos();
	}, []);

	const getAllTodos = async () => {
		setIsLoading(true);

		try {
			const recivedTodos = await TodosAPI.fetchAll();
			setTodos(recivedTodos);
		} catch (error) {
			setError(error);
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const searchedTodos = todos.filter((todo) =>
		todo.title.toLowerCase().includes(searchText.toLowerCase()),
	);

	const sortedTodos = isSorting
		? searchedTodos.toSorted((a, b) =>
				a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
			)
		: searchedTodos;

	return {
		todos: sortedTodos,
		setTodos,
		isLoading,
		error,
		searchText,
		setSearchText,
		isSorting,
		setIsSorting,
	};
};
