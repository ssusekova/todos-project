import { useState, useEffect } from 'react';

export const useRequestGetTodos = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [refreshTodos, setRefreshTodos] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		fetch('http://localhost:5050/todos')
			.then((response) => response.json())
			.then((json) => {
				setTodos(json);
			})
			.finally(() => setIsLoading(false));
	}, [refreshTodos]);

	const refreshTodoList = () => {
		setRefreshTodos(!refreshTodos);
	};

	return { todos, isLoading, refreshTodoList };
};
