import { ref, remove } from 'firebase/database';
import { db } from '../firebase';

export const useRequestDeleteTodo = () => {
	const deleteTodo = (todoId) => {
		const todosDbRef = ref(db, 'todos/'.concat(todoId));

		remove(todosDbRef).then((response) => {
			console.log('Todo удален, ответ сервера:', response);
		});
	};

	return { deleteTodo };
};
