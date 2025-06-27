import { TodosAPI } from '../API/TodosAPI';

const changeTodoInDb = async (todo) => {
	try {
		console.log('todo', todo);
		const response = await TodosAPI.update(todo);
		console.log('Todo обновлён, ответ сервера:', response);
	} catch (error) {
		console.error('Ошибка при обновлении задачи:', error);
	}

	return { changeTodo };
};

export const changeTodo = (todo) => (dispatch) => {
	dispatch({ type: 'START_LOADING' });

	changeTodoInDb(todo)
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
