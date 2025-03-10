import { useState } from 'react';
import { ref, push } from 'firebase/database';
import { db } from '../firebase';

export const useRequestCreateNewTodo = () => {
	const [newTodoTitle, setNewTodoTitle] = useState('');

	const createNewTodo = (todoTitle) => {
		if (!todoTitle) return;

		const todosDbRef = ref(db, 'todos');

		push(todosDbRef, {
			title: todoTitle,
			completed: false,
		}).then((response) => {
			console.log('Todo создан, ответ сервера:', response);
			setNewTodoTitle('');
		});
	};

	return { createNewTodo, newTodoTitle, setNewTodoTitle };
};
