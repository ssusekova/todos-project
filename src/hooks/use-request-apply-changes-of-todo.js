import { useContext } from 'react';
import { AppContext } from '../context.js';

export const useRequestApplyChangesOfTodo = (setEditingTodoId) => {
	const { refreshTodos } = useContext(AppContext);

	const applyChangesOfTodo = (todoId, editTodoTitle, isCompleted) => {
		fetch('http://localhost:5050/todos/'.concat(todoId), {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: editTodoTitle,
				completed: isCompleted,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Todo обновлён, ответ сервера:', response);
				refreshTodos();
			});
		setEditingTodoId(null);
	};

	return { applyChangesOfTodo };
};
