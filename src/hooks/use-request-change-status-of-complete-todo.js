import { ref, update } from 'firebase/database';
import { db } from '../firebase';

export const useRequestChangeStatusOfCompleteTodo = () => {
	const changeStatusOfCompleteTodo = (todoId, isCompleted) => {
		const todosDbRef = ref(db, 'todos/'.concat(todoId));

		update(todosDbRef, {
			completed: !isCompleted,
		}).then((response) => {
			console.log('Статус Todo обновлён, ответ сервера:', response);
		});
	};

	return { changeStatusOfCompleteTodo };
};
