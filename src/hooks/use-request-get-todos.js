import { useState, useEffect, useCallback } from 'react';

export const useRequestGetTodos = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchTodos = useCallback(() => {
		setIsLoading(true);
		fetch('http://localhost:5050/todos')
			.then((response) => response.json())
			.then((json) => setTodos(json))
			.finally(() => setIsLoading(false));
	}, []);

	useEffect(() => {
		fetchTodos();
	}, [fetchTodos]);

	const refreshTodos = () => {
		fetchTodos();
	};

	return {
		todos,
		isLoading,
		refreshTodos,
	};
};
