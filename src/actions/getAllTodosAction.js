import { TodosAPI } from '../API/TodosAPI';

const fetchAllTodos = async (isSorting, searchPhrase) => {
	try {
		const recivedTodos = await TodosAPI.fetchAll(isSorting, searchPhrase);
		return recivedTodos;
	} catch (error) {
		console.log('Ошибка при получении задач:', error);

		return error;
	}
};

export const getAllTodos = (isSorting, searchPhrase) => (dispatch) => {
	dispatch({ type: 'START_LOADING' });
	fetchAllTodos(isSorting, searchPhrase)
		.then((todosDataFromServer) =>
			dispatch({
				type: 'GET_ALL_TODOS',
				payload: todosDataFromServer,
			}),
		)
		.finally(() => {
			dispatch({ type: 'END_LOADING' });
		});
};
