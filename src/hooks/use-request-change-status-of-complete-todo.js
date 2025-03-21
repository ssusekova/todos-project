import { useContext } from 'react';
import { AppContext } from '../context.js';

export const useRequestChangeStatusOfCompleteTodo = () => {
	const { refreshTodos } = useContext(AppContext);

	const changeStatusOfCompleteTodo = (todoId, isCompleted) => {
		fetch('http://localhost:5050/todos/'.concat(todoId), {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				completed: !isCompleted,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Статус Todo обновлён, ответ сервера:', response);
				refreshTodos();
			});
	};

	return { changeStatusOfCompleteTodo };
};
