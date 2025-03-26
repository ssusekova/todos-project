import { useEffect, useState } from 'react';
import { TodosAPI } from '../API/TodosAPI';

export const useRequestGetTodoItem = (id) => {
	const [todoItem, setTodoItem] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (id) {
			getTodoById(id);
		}
	}, [id]);

	const getTodoById = async (id) => {
		setIsLoading(true);

		try {
			const recivedTodo = await TodosAPI.fetchItemById(id);

			setTodoItem(recivedTodo);
		} catch (error) {
			setError(error);
			// navigate('/not-exist');
			// navigate('/load-error');
		} finally {
			setIsLoading(false);
		}
	};

	return { todoItem, setTodoItem, isLoading, error };
};
