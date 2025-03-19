import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

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
	const LOADING_TIMEOUT = 1000;

	const navigate = useNavigate();

	const [item, setItem] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [refreshItem, setRefreshItem] = useState(false);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			navigate('/load-error');
		}, LOADING_TIMEOUT);

		setIsLoading(true);
		fetch(`http://localhost:5050/todos/${id}`)
			.then((response) => {
				if (!response.ok) {
					return navigate('/load-error');
				}
				return response.json();
			})
			.then((json) => {
				setIsLoading(false);
				setItem(json);
				clearTimeout(timeoutId);
			})
			.catch(() => {
				navigate('/not-exist');
			});
	}, [id, navigate, refreshItem]);

	const refreshItemInfo = () => {
		setRefreshItem(!refreshItem);
	};

	return { item, isLoading, refreshItemInfo };
};
