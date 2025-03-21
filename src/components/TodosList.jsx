import { useState } from 'react';
import '../index.css';
import {
	useRequestApplyChangesOfTodo,
	useRequestChangeStatusOfCompleteTodo,
	useRequestDeleteTodo,
	useRequestCreateNewTodo,
} from '../hooks';
import { useContext } from 'react';
import { AppContext } from '../context.js';

export const TodosList = () => {
	const { todos, sortedTodos, searchInfo } = useContext(AppContext);

	const [editTodoTitle, setEditTodoTitle] = useState('');
	const [editingTodoId, setEditingTodoId] = useState(null);

	const { applyChangesOfTodo } = useRequestApplyChangesOfTodo(setEditingTodoId);
	const { changeStatusOfCompleteTodo } = useRequestChangeStatusOfCompleteTodo();
	const { deleteTodo } = useRequestDeleteTodo();
	const { createNewTodo, newTodoTitle, setNewTodoTitle } = useRequestCreateNewTodo();

	const editTodo = (todoId, todoTitle) => {
		setEditingTodoId(todoId);
		setEditTodoTitle(todoTitle);
	};
	const todoList = sortedTodos.length > 0 ? sortedTodos : todos;

	return (
		<>
			<div className="todos-list">
				{(searchInfo.isSearching ? searchInfo.searchedTodos : todoList).map(
					({ id, title, completed }) => (
						<div
							key={id}
							className={`todo-item ${completed ? 'completed' : ''}`}
						>
							<input
								type="checkbox"
								key={id}
								checked={completed}
								onChange={() => changeStatusOfCompleteTodo(id, completed)}
							/>

							<form
								className="todo_form"
								onSubmit={(e) => {
									e.preventDefault();
									applyChangesOfTodo(id, editTodoTitle, completed);
								}}
							>
								<input
									type="text"
									className="todo-text"
									value={editingTodoId === id ? editTodoTitle : title}
									onChange={(e) => setEditTodoTitle(e.target.value)}
									readOnly={editingTodoId !== id}
								/>

								{editingTodoId === id ? (
									<input
										type="submit"
										className="button-todo-item-action"
										value="✔️"
									/>
								) : (
									<button
										className="button-todo-item-action"
										onClick={() => editTodo(id, title)}
									>
										🖋️
									</button>
								)}
							</form>
							<button
								className="button-todo-item-action"
								onClick={() => deleteTodo(id)}
							>
								❌
							</button>
						</div>
					),
				)}

				<form
					className="new-todo-item"
					onSubmit={(e) => {
						e.preventDefault();
						createNewTodo(newTodoTitle);
					}}
				>
					<input type="checkbox" readOnly />
					<input
						type="text"
						className="todo-text"
						placeholder="Новое дело"
						value={newTodoTitle}
						onChange={(e) => setNewTodoTitle(e.target.value)}
					/>
					<input className="button-todo-item-action" type="submit" value="➕" />
				</form>
			</div>
		</>
	);
};
