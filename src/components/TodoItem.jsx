import '../index.css';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { changeTodo, deleteTodo, getTodoItem } from '../actions';

export const TodoItem = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [editedTitle, setEditedTitle] = useState('');

	const todoItem = useSelector((state) => state.todosState.todoItem);
	const isLoading = useSelector((state) => state.mainOperationsState.isLoading);

	useEffect(() => {
		dispatch(getTodoItem(id));
	}, [dispatch]);

	useEffect(() => {
		if (todoItem?.title) {
			setEditedTitle(todoItem.title);
		}
	}, [todoItem?.title]);

	const handleSave = (e) => {
		try {
			e.preventDefault();
			dispatch(changeTodo({ ...todoItem, title: editedTitle }));
		} catch {
			navigate('/save-error');
		}
	};

	const handleDelete = () => {
		try {
			dispatch(deleteTodo(id));
			navigate('/');
		} catch {
			navigate('/save-error');
		}
	};

	const handleEditTitle = (newTitle) => {
		setEditedTitle(newTitle);
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
									value={editedTitle}
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
