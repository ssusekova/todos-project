import { useState } from 'react';
import { TodosAPI } from '../API/TodosAPI';

export const useRequestDeleteTodo = (id) => {
	const [error, setError] = useState(null);

	const deleteTodoById = async () => {
		try {
			const deletedTodo = await TodosAPI.delete(id);
			console.log('Todo удален, ответ сервера:', deletedTodo);
			return deletedTodo;
		} catch (error) {
			setError(error);
		}
	};

	return { deleteTodoById, error };
};
