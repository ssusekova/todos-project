import { TodosAPI } from '../API/TodosAPI';

const changeStatus = async (id, completed) => {
	try {
		const changedTodo = await TodosAPI.update({ id, completed });
		console.log('Статус Todo обновлён, ответ сервера:', changedTodo);
		return changedTodo;
	} catch (error) {
		console.error('Ошибка при изменении статуса задачи:', error);
	}
};

export const changeStatusOfCompleteTodo = (id, completed) => (dispatch) => {
	dispatch({ type: 'START_LOADING' });

	changeStatus(id, completed)
		.then((changedDataFromServer) =>
			dispatch({
				type: 'UPDATE_TODO',
				payload: changedDataFromServer,
			}),
		)
		.finally(() => {
			dispatch({ type: 'END_LOADING' });
		});
};
