import { useState, useParams } from 'react';
import '../index.css';
import {
	useRequestApplyChangesOfTodo,
	useRequestDeleteTodo,
	useRequestGetTodoById,
} from '../hooks';

export const TodoItemPage = () => {
	const [editTodoTitle, setEditTodoTitle] = useState('');
	const [editingTodoId, setEditingTodoId] = useState(null);

	// const { todos, isLoading, refreshTodoList, sortTodos } = useRequestGetTodos();
	const { applyChangesOfTodo } = useRequestApplyChangesOfTodo(
		// refreshTodoList,
		setEditingTodoId,
	);
	const { deleteTodo } = useRequestDeleteTodo(/* refreshTodoList */);

	const editTodo = (todoId, todoTitle) => {
		setEditingTodoId(todoId);
		setEditTodoTitle(todoTitle);
	};
	const params = useParams();

	const { id, title, completed } = useRequestGetTodoById(params.id);

	return (
		<>
			<div key={id} className={`todo-item ${completed ? 'completed' : ''}`}>
				<input
					type="text"
					className="todo-text"
					value={editingTodoId === id ? editTodoTitle : title}
					onChange={(e) => setEditTodoTitle(e.target.value)}
					readOnly={editingTodoId !== id}
				/>

				{editingTodoId === id ? (
					<button
						className="button-todo-item-action"
						onClick={() => applyChangesOfTodo(id, editTodoTitle, completed)}
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
		</>
	);
};
