import PropTypes from 'prop-types';
import { Link } from 'react-router';

import '../index.css';
import { useRequestChangeStatusOfCompleteTodo, useRequestCreateNewTodo } from '../hooks';

export const TodosList = ({ todos, isLoading, refreshTodoList, searchInfo }) => {
	const { changeStatusOfCompleteTodo } =
		useRequestChangeStatusOfCompleteTodo(refreshTodoList);
	const { createNewTodo, newTodoTitle, setNewTodoTitle } =
		useRequestCreateNewTodo(refreshTodoList);

	return (
		<>
			{isLoading ? (
				<div className="loader" />
			) : (
				<div className="todos-list">
					{(searchInfo.isSearching ? searchInfo.searchedTodos : todos).map(
						({ id, title, completed }) => (
							<div
								key={id}
								className={`todo-item ${completed ? 'completed' : ''}`}
							>
								<input
									type="checkbox"
									key={id}
									checked={completed}
									onChange={() =>
										changeStatusOfCompleteTodo(id, completed)
									}
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
						<input className="action-button" type="submit" value="➕" />
					</form>
				</div>
			)}
		</>
	);
};

TodosList.propTypes = {
	todos: PropTypes.array.isRequired,
	isLoading: PropTypes.bool.isRequired,
	refreshTodoList: PropTypes.func.isRequired,
	searchInfo: PropTypes.object.isRequired,
};
