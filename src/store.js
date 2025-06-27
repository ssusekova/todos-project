import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { todosReducer, mainOperationsReducer } from './reducers';

const reducer = combineReducers({
	todosState: todosReducer,
	mainOperationsState: mainOperationsReducer,
});

export const store = createStore(reducer, applyMiddleware(thunk));
