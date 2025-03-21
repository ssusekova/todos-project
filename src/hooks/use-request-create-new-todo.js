import { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../context.js';

export const useRequestCreateNewTodo = () => {
	const { refreshTodos } = useContext(AppContext);
	const [newTodoTitle, setNewTodoTitle] = useState('');

	const createNewTodo = (todoTitle) => {
		if (!todoTitle) return;

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
				refreshTodos();
				setNewTodoTitle('');
			});
	};

	return { createNewTodo, newTodoTitle, setNewTodoTitle };
};
