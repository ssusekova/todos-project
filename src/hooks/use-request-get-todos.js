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

	const sortTodos = () => {
		const sortedTodos = [...todos].sort((a, b) =>
			a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
		);

		setTodos(sortedTodos);
	};

	return { todos, isLoading, refreshTodoList, sortTodos };
};

export const useRequestGetTodoById = (id) => {
	const [item, setItem] = useState([]);

	useEffect(() => {
		fetch('http://localhost:5050/todos/'.concat(id))
			.then((response) => response.json())
			.then((json) => {
				setItem(json);
				// console.log(json);
			});
	});

	return { item };
};
