export const initialTodosState = {
	todos: [],
	todoItem: {},
};

export const todosReducer = (state = initialTodosState, { type, payload }) => {
	switch (type) {
		case 'GET_ALL_TODOS':
			return { ...state, todos: payload };
		case 'GET_TODO_ITEM':
			return { ...state, todoItem: payload };
		case 'UPDATE_TODO':
			return {
				...state,
				todos: state.todos.map((todo) =>
					todo.id === payload.id ? { ...todo, ...payload } : todo,
				),
			};
		case 'CREATE_TODO':
			return {
				...state,
				todos: [payload, ...state.todos],
			};
		case 'DELETE_TODO':
			return {
				...state,
				todos: state.todos.filter(({ id }) => id !== payload),
			};
		default:
			return state;
	}
};
