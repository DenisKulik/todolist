import { combineReducers, legacy_createStore as createStore } from 'redux';
import tasksReducer from './tasksReducer';
import todolistsReducer from './todolistsReducer';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
});

export const store = createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>
