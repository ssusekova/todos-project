import { Routes, Route, Navigate } from 'react-router';
import './index.css';
import { TodoItem } from './components/TodoItem';
import { TodosListPage } from './pages/TodosListPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { LoadErrorPage } from './pages/LoadErrorPage';
import { SaveErrorPage } from './pages/SaveErrorPage';

export const App = () => {
	return (
		<Routes>
			<Route path="/" element={<TodosListPage />} />
			<Route path="/task/:id" element={<TodoItem />} />
			<Route path="/load-error" element={<LoadErrorPage />} />
			<Route path="/save-error" element={<SaveErrorPage />} />
			<Route path="/404" element={<NotFoundPage />} />
			<Route path="*" element={<Navigate to="/404" />} />
		</Routes>
	);
};
