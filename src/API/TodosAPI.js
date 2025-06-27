import config from '../config.json';

const TODOS_ENDPOINT = config.BASE_URL + 'todos/';

const fetchServer = async (
	method = 'GET',
	{ id, ...payload } = {},
	isSorting = false,
	searchText = null,
) => {
	let url = TODOS_ENDPOINT;
	if (id !== undefined) {
		url += id;
	}

	const init = {
		method: method,
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
	};

	if (method === 'POST' || method === 'PATCH') {
		init.body = JSON.stringify(payload);
	}

	const rawResponse = await fetch(url, init);

	const response = await rawResponse.json();

	if (isSorting)
		return isSorting
			? response.toSorted((a, b) =>
					a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
				)
			: response;

	if (searchText)
		return response.filter((todo) =>
			todo.title.toLowerCase().includes(searchText.toLowerCase()),
		);

	return response;
};

export const TodosAPI = {
	fetchAll: async (isSorting, searchText) =>
		await fetchServer('GET', {}, isSorting, searchText),
	fetchItemById: async (id) => await fetchServer('GET', { id: id }),
	create: async (title = '', completed = false) =>
		await fetchServer('POST', { title, completed }),
	update: async (item) => await fetchServer('PATCH', item),
	delete: async (id) => await fetchServer('DELETE', { id }),
};
