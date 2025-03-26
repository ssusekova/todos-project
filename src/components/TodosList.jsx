import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router';
import { setTodoOnTodos, addTodoInTodos } from '../utils';
import '../index.css';
import { useRequestChangeStatusOfCompleteTodo, useRequestCreateNewTodo } from '../hooks';

export const TodosList = ({ todos, setTodos, isLoading, error }) => {
	const navigate = useNavigate();

	const { changeStatusOfCompleteTodo } = useRequestChangeStatusOfCompleteTodo();
	const { createNewTodo, newTodoTitle, setNewTodoTitle } = useRequestCreateNewTodo();

	if (error) return navigate('/load-error');

	const handleStatusChange = async (id, completed) => {
		try {
			const updatedTodo = await changeStatusOfCompleteTodo(id, !completed);

			const newTodos = setTodoOnTodos(todos, updatedTodo);
			setTodos(newTodos);
		} catch {
			navigate('/save-error');
		}
	};

	const handleCreateTodo = async () => {
		try {
			const createdTodo = await createNewTodo();

			const newTodos = addTodoInTodos(todos, createdTodo);
			setTodos(newTodos);
		} catch {
			navigate('/save-error');
		}
	};

	return (
		<>
			{isLoading ? (
				<div className="loader" />
			) : (
				<div className="todos-list">
					{todos.map(({ id, title, completed }) => (
						<div
							key={id}
							className={`todo-item-in-list ${completed ? 'completed' : ''}`}
						>
							<input
								type="checkbox"
								key={id}
								checked={completed}
								onChange={() => handleStatusChange(id, completed)}
							/>

							<Link to={`task/${id}`} className="todo-text">
								<input
									type="text"
									className="todo-text"
									value={title}
									readOnly
								/>
							</Link>
						</div>
					))}

					<form
						className="new-todo-item"
						onSubmit={(e) => {
							e.preventDefault();
							handleCreateTodo();
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
						<input className="action-button" type="submit" value="➕" />
					</form>
				</div>
			)}
		</>
	);
};

TodosList.propTypes = {
	todos: PropTypes.array.isRequired,
	setTodos: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
	error: PropTypes.object.isRequired,
};
