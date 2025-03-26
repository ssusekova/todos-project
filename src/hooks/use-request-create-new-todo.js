import { useState } from 'react';
import { TodosAPI } from '../API/TodosAPI';

export const useRequestCreateNewTodo = () => {
	const [newTodoTitle, setNewTodoTitle] = useState('');

	const createNewTodo = async () => {
		try {
			const createdTodo = await TodosAPI.create(newTodoTitle);
			console.log('Статус Todo создан, ответ сервера:', createdTodo);
			return createdTodo;
		} catch (error) {
			console.error('Ошибка при создании задачи:', error);
		}
	};

	return { createNewTodo, newTodoTitle, setNewTodoTitle };
};
