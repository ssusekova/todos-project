export const useRequestApplyChangesOfTodo = (setRefreshTodos, setEditingTodoId) => {
	const applyChangesOfTodo = (todoId, editTodoTitle, isCompleted) => {
		fetch('http://localhost:5050/todos/'.concat(todoId), {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: editTodoTitle,
				completed: isCompleted,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Todo обновлён, ответ сервера:', response);
				setRefreshTodos();
			});
		setEditingTodoId(null);
	};

	return { applyChangesOfTodo };
};
