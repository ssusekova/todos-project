import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTodos, changeStatusOfCompleteTodo, createNewTodo } from '../actions';
import '../index.css';

export const TodosList = () => {
	const dispatch = useDispatch();
	const todos = useSelector((state) => state.todosState.todos);
	const isLoading = useSelector((state) => state.mainOperationsState.isLoading);
	const isSorting = useSelector((state) => state.mainOperationsState.isSorting);
	const searchPhrase = useSelector((state) => state.mainOperationsState.searchPhrase);

	const [newTodoTitle, setNewTodoTitle] = useState('');

	useEffect(() => {
		dispatch(getAllTodos(isSorting, searchPhrase));
	}, [dispatch, isSorting, searchPhrase]);

	const handleStatusChange = (id, completed) => {
		dispatch(changeStatusOfCompleteTodo(id, completed));
	};

	const handleCreateTodo = () => {
		dispatch(createNewTodo(newTodoTitle));
		setNewTodoTitle('');
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
								onChange={() => handleStatusChange(id, !completed)}
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
