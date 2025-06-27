import { TodosAPI } from '../API/TodosAPI';

const createTodoInDb = async (newTodoTitle) => {
	try {
		const createdTodo = await TodosAPI.create(newTodoTitle);
		console.log('Статус Todo создан, ответ сервера:', createdTodo);
		return createdTodo;
	} catch (error) {
		console.error('Ошибка при создании задачи:', error);
	}
};

export const createNewTodo = (newTodoTitle) => (dispatch) =>
	createTodoInDb(newTodoTitle).then((createdDataFromServer) =>
		dispatch({
			type: 'CREATE_TODO',
			payload: createdDataFromServer,
		}),
	);
