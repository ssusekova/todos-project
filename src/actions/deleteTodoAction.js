import { TodosAPI } from '../API/TodosAPI';

const deleteTodoInDb = async (id) => {
	try {
		const deletedTodo = await TodosAPI.delete(id);
		console.log('Todo удален, ответ сервера:', deletedTodo);
		return deletedTodo;
	} catch (error) {
		console.error('Ошибка при удалении задачи:', error);
	}
};

export const deleteTodo = (id) => (dispatch) => {
	dispatch({ type: 'START_LOADING' });

	deleteTodoInDb(id)
		.then((responseFromServer) =>
			dispatch({
				type: 'DELETE_TODO',
				payload: responseFromServer,
			}),
		)
		.finally(() => {
			dispatch({ type: 'END_LOADING' });
		});
};
