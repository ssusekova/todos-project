import { ControlPanel } from '../components/ControlPanel';
import { TodosList } from '../components/TodosList';
import { useRequestGetTodos } from '../hooks';

export const TodosListPage = () => {
	const {
		todos,
		setTodos,
		isLoading,
		error,
		searchText,
		setSearchText,
		isSorting,
		setIsSorting,
	} = useRequestGetTodos();
	return (
		<>
			<h1 className="app-title">Список дел</h1>
			<ControlPanel
				isSorting={isSorting}
				setIsSorting={setIsSorting}
				searchText={searchText}
				setSearchText={setSearchText}
			/>
			<TodosList
				todos={todos}
				setTodos={setTodos}
				isLoading={isLoading}
				error={error}
			/>
		</>
	);
};
