export const setTodoOnTodos = (todos = [], newTodoItem = {}) => {
	return todos.map((todo) =>
		todo.id === newTodoItem.id
			? {
					...todo,
					...newTodoItem,
				}
			: todo,
	);
};

export const addTodoInTodos = (todos = [], todo = {}) => {
	return [...todos, todo];
};
