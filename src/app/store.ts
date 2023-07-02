import {
    AnyAction, applyMiddleware, combineReducers,
    legacy_createStore as createStore
} from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import tasksReducer, {
    TasksActionsType
} from '../features/Todolists/tasksReducer';
import todolistsReducer, {
    TodolistsActionsType
} from '../features/Todolists/todolistsReducer';
import { useDispatch } from 'react-redux';

export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>;
export type AppActionsType = TodolistsActionsType | TasksActionsType;
export const useAppDispatch = () => useDispatch<AppDispatchType>();
export type AppThunkType<ReturnType = void> = ThunkAction<
    ReturnType,
    AppRootStateType,
    unknown,
    AnyAction
>
