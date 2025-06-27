import { TodosAPI } from '../API/TodosAPI';

const fetchTodoFromDb = async (id) => {
	try {
		const recivedTodo = await TodosAPI.fetchItemById(id);
		console.log(recivedTodo);

		return recivedTodo;
	} catch (error) {
		console.log('Ошибка при получении задачи:', error);

		return error;
	}
};

export const getTodoItem = (id) => (dispatch) => {
	dispatch({ type: 'START_LOADING' });
	fetchTodoFromDb(id)
		.then((todosDataFromServer) =>
			dispatch({
				type: 'GET_TODO_ITEM',
				payload: todosDataFromServer,
			}),
		)
		.finally(() => {
			dispatch({ type: 'END_LOADING' });
		});
};
