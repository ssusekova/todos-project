import { useState } from 'react';

export const useRequestCreateNewTodo = (setRefreshTodos) => {
	const [newTodoTitle, setNewTodoTitle] = useState('');

	const createNewTodo = (todoTitle) => {
		fetch('http://localhost:5050/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: todoTitle,
				completed: false,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Todo создан, ответ сервера:', response);
				setRefreshTodos();
				setNewTodoTitle('');
			});
	};

	return { createNewTodo, newTodoTitle, setNewTodoTitle };
};
