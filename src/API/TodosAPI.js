import config from '../config.json';

const TODOS_ENDPOINT = config.BASE_URL + 'todos/';

const fetchServer = async (method = 'GET', { id, ...payload } = {}) => {
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

	const response = await fetch(url, init);
	return await response.json();
};

export const TodosAPI = {
	fetchAll: async () => await fetchServer(),
	fetchItemById: async (id) => await fetchServer('GET', { id: id }),
	create: async (title = '', completed = false) =>
		await fetchServer('POST', { title, completed }),
	update: async (item) => await fetchServer('PATCH', item),
	delete: async (id) => await fetchServer('DELETE', { id }),
};
