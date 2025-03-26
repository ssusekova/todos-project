import { TodosAPI } from '../API/TodosAPI';

export const useRequestChangeStatusOfCompleteTodo = () => {
	const changeStatusOfCompleteTodo = async (id, completed) => {
		try {
			const changedTodo = await TodosAPI.update({ id, completed });
			console.log('Статус Todo обновлён, ответ сервера:', changedTodo);
			return changedTodo;
		} catch (error) {
			console.error('Ошибка при изменении статуса задачи:', error);
		}
	};

	return { changeStatusOfCompleteTodo };
};
