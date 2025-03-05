import { useEffect, useState } from 'react';
import './index.css';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		fetch('https://jsonplaceholder.typicode.com/users/1/todos')
			.then((response) => response.json())
			.then((json) => {
				setTodos(json);
			})
			.finally(() => setIsLoading(false));
	}, []);

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
							{' '}
							{id}
							<input
								type="checkbox"
								key={id}
								checked={completed}
								readOnly
							/>
							<label>{title}</label>
						</div>
					))}
				</div>
			)}
		</>
	);
};
