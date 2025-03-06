export const useRequestDeleteTodo = (setRefreshTodos) => {
	const deleteTodo = (todoId) => {
		fetch('http://localhost:5050/todos/'.concat(todoId), {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Todo удален, ответ сервера:', response);
				setRefreshTodos();
			});
	};

	return { deleteTodo };
};
