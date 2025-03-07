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
	const [searchText, setSearchText] = useState('');
	const [highlightedTodoId, setHighlightedTodo] = useState([]);

	const { todos, isLoading, refreshTodoList, sortTodos } = useRequestGetTodos();
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

	const getSearchedTodos = () => {
		const filteredTodos = todos.filter((todo) =>
			todo.title.toLowerCase().includes(searchText.toLowerCase()),
		);
		setHighlightedTodo(filteredTodos);
	};

	return (
		<>
			<h1 className="app-title">Список дел</h1>

			<div className="search-bar">
				<input
					type="text"
					className="search-input"
					placeholder="Поиск"
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
				/>
				<button className="button-todo-item-action" onClick={getSearchedTodos}>
					🔍
				</button>
				<button className="sort-button" onClick={sortTodos} />
			</div>

			{isLoading ? (
				<div className="loader" />
			) : (
				<div className="todos-list">
					{todos.map(({ id, title, completed }) => (
						<div
							key={id}
							className={`todo-item ${completed ? 'completed' : ''} ${
								highlightedTodoId.some((todo) => todo.id === id)
									? 'highlighted'
									: ''
							}`}
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
							/>

							{editingTodoId === id ? (
								<button
									className="button-todo-item-action"
									onClick={() =>
										applyChangesOfTodo(id, editTodoTitle, completed)
									}
								>
									✔️
								</button>
							) : (
								<button
									className="button-todo-item-action"
									onClick={() => editTodo(id, title)}
								>
									🖋️
								</button>
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
						/>
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
