import { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router';
import '../index.css';
import {
	useRequestApplyChangesOfTodo,
	useRequestDeleteTodo,
	useRequestGetTodoById,
} from '../hooks';
import PropTypes from 'prop-types';

export const TodoItem = ({ refreshTodoList }) => {
	const params = useParams();
	const navigate = useNavigate();

	const { item, isLoading, refreshItemInfo } = useRequestGetTodoById(params.id);
	const [editTodoTitle, setEditTodoTitle] = useState('');
	const [isEdit, setIsEdit] = useState(false);

	const { applyChangesOfTodo } = useRequestApplyChangesOfTodo(
		refreshItemInfo,
		refreshTodoList,
	);
	const { deleteTodo } = useRequestDeleteTodo(refreshTodoList);

	if (isLoading) return <div>Loading...</div>;
	if (!item) return <Navigate to="/404" replace />;

	const { id, title } = item;

	const handleEdit = (e) => {
		e.preventDefault();
		setIsEdit(true);
		setEditTodoTitle(title);
	};

	const handleSave = (e) => {
		e.preventDefault();
		console.log(editTodoTitle);
		applyChangesOfTodo(id, editTodoTitle);
		setIsEdit(false);
	};

	const handleDelete = () => {
		deleteTodo(id);
		navigate('/');
	};

	return (
		<div className="todo-item-container">
			<button className="button-back" onClick={() => navigate(-1)}>
				Назад
			</button>

			<div className="todo-item">
				<div className="todo-content">
					<form className="todo-form" onSubmit={handleSave}>
						<textarea
							className="todo-full-text"
							value={isEdit ? editTodoTitle : title}
							onChange={(e) => setEditTodoTitle(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === 'Enter' && !e.shiftKey) {
									e.preventDefault();
									handleSave({ preventDefault: () => {} });
								}
							}}
							readOnly={!isEdit}
						/>
						{isEdit ? (
							<button type="submit" className="action-button">
								✔️
							</button>
						) : (
							<button
								type="button"
								className="action-button"
								onClick={handleEdit}
							>
								🖋️
							</button>
						)}
						<button className="delete-button" onClick={handleDelete}>
							❌
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

TodoItem.propTypes = {
	refreshTodoList: PropTypes.func.isRequired,
};
