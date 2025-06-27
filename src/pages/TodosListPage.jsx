import { ControlPanel } from '../components/ControlPanel';
import { TodosList } from '../components/TodosList';

export const TodosListPage = () => {
	return (
		<>
			<h1 className="app-title">Список дел</h1>
			<ControlPanel />
			<TodosList />
		</>
	);
};
