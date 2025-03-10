import { ref, set } from 'firebase/database';
import { db } from '../firebase';

export const useRequestApplyChangesOfTodo = (setEditingTodoId) => {
	const applyChangesOfTodo = (todoId, editTodoTitle, isCompleted) => {
		const todosDbRef = ref(db, 'todos/'.concat(todoId));

		set(todosDbRef, {
			title: editTodoTitle,
			completed: isCompleted,
		}).then((response) => {
			console.log('Todo обновлён, ответ сервера:', response);
		});
		setEditingTodoId(null);
	};

	return { applyChangesOfTodo };
};
