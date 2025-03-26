import { TodosAPI } from '../API/TodosAPI';

export const useRequestApplyChangesOfTodo = () => {
	const changeTodo = async (todo) => {
		try {
			const response = await TodosAPI.update(todo);
			console.log('Todo обновлён, ответ сервера:', response);
		} catch (error) {
			console.error('Ошибка при обновлении задачи:', error);
		}
	};

	return { changeTodo };
};
