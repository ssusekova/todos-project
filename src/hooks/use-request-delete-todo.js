import { useContext } from 'react';
import { AppContext } from '../context.js';

export const useRequestDeleteTodo = () => {
	const { refreshTodos } = useContext(AppContext);

	const deleteTodo = (todoId) => {
		fetch('http://localhost:5050/todos/'.concat(todoId), {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Todo удален, ответ сервера:', response);
				refreshTodos();
			});
	};

	return { deleteTodo };
};
