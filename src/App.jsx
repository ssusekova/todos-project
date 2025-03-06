import { useState, useRef } from 'react';
import './index.css';
import {
	useRequestApplyChangesOfTodo,
	useRequestChangeStatusOfCompleteTodo,
	useRequestDeleteTodo,
	useRequestCreateNewTodo,
	useRequestGetTodos,
} from './hooks';

export const App = () => {
	const editInputRef = useRef(null);

	const [editTodoTitle, setEditTodoTitle] = useState('');
	const [editingTodoId, setEditingTodoId] = useState(null);

	const { todos, isLoading, refreshTodoList } = useRequestGetTodos();
	const { applyChangesOfTodo } = useRequestApplyChangesOfTodo(
		refreshTodoList,
		setEditingTodoId,
	);
	const { changeStatusOfCompleteTodo } =
		useRequestChangeStatusOfCompleteTodo(refreshTodoList);
	const { deleteTodo } = useRequestDeleteTodo(refreshTodoList);
	const { createNewTodo, newTodoTitle, setNewTodoTitle } =
		useRequestCreateNewTodo(refreshTodoList);

	const editTodo = (todoId, todoTitle) => {
		setEditingTodoId(todoId);
		setEditTodoTitle(todoTitle);
		editInputRef.current.focus();
	};
	return (
		<>
			<h1 className="app-title">Список дел</h1>
			{isLoading ? (
				<div className="loader"></div>
			) : (
				<div className="todos-list">
					{todos.map(({ id, title, completed }) => (
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
							<input
								type="text"
								className="todo-text"
								ref={editInputRef}
								value={editingTodoId === id ? editTodoTitle : title}
								onChange={(e) => setEditTodoTitle(e.target.value)}
								readOnly={editingTodoId !== id}
							></input>

							{editingTodoId === id ? (
								<>
									<button
										className="button-todo-item-action"
										onClick={() =>
											applyChangesOfTodo(
												id,
												editTodoTitle,
												completed,
											)
										}
									>
										✔️
									</button>
								</>
							) : (
								<>
									<button
										className="button-todo-item-action"
										onClick={() => editTodo(id, title)}
									>
										🖋️
									</button>
								</>
							)}

							<button
								className="button-todo-item-action"
								onClick={() => deleteTodo(id)}
							>
								❌
							</button>
						</div>
					))}

					<div className="new-todo-item">
						<input type="checkbox" readOnly />
						<input
							type="text"
							className="todo-text"
							placeholder="Новое дело"
							value={newTodoTitle}
							onChange={(e) => setNewTodoTitle(e.target.value)}
						></input>
						<button
							className="button-todo-item-action"
							onClick={() => createNewTodo(newTodoTitle)}
						>
							➕
						</button>
					</div>
				</div>
			)}
		</>
	);
};
