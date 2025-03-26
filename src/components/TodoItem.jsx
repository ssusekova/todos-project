import '../index.css';
import { useParams, useNavigate } from 'react-router';
import { useRequestGetTodoItem } from '../hooks/use-request-get-todo-item';
import { useRequestApplyChangesOfTodo, useRequestDeleteTodo } from '../hooks';

export const TodoItem = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const { todoItem, setTodoItem, isLoading, error } = useRequestGetTodoItem(id);

	const { changeTodo } = useRequestApplyChangesOfTodo();
	const { deleteTodoById } = useRequestDeleteTodo(id);

	if (error) return navigate('/load-error');

	const handleSave = (e) => {
		try {
			e.preventDefault();
			changeTodo(todoItem);
		} catch {
			navigate('/save-error');
		}
	};

	const handleDelete = () => {
		try {
			deleteTodoById();
			navigate('/');
		} catch {
			navigate('/save-error');
		}
	};

	const handleEditTitle = (newTitle) => {
		setTodoItem((prevTodo) => ({
			...prevTodo,
			title: newTitle,
		}));
	};

	return (
		<>
			{isLoading ? (
				<div className="loader" />
			) : (
				<div className="todo-item-container">
					<button className="button-back" onClick={() => navigate(-1)}>
						Назад
					</button>

					<div className="todo-item">
						<div className="todo-content">
							<form className="todo-form" onSubmit={handleSave}>
								<textarea
									className="todo-full-text"
									value={todoItem?.title}
									onChange={(e) => handleEditTitle(e.target.value)}
								/>
								<button type="submit" className="action-button">
									✔️
								</button>

								<button
									type="button"
									className="delete-button"
									onClick={handleDelete}
								>
									❌
								</button>
							</form>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
