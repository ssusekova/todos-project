export const useRequestApplyChangesOfTodo = (refreshItemInfo, refreshTodoList) => {
	const applyChangesOfTodo = (todoId, editTodoTitle) => {
		fetch('http://localhost:5050/todos/'.concat(todoId), {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: editTodoTitle,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Todo обновлён, ответ сервера:', response);
				refreshItemInfo();
				refreshTodoList();
			});
	};

	return { applyChangesOfTodo };
};
