import axios from 'axios';
import {
    ErrorType, ResultCode, todolistAPI, TodolistType
} from '../../api/todolistAPI';
import { Dispatch } from 'redux';
import { ActionsType, AppThunkType } from '../../app/store';
import {
    RequestStatusType, SetAppErrorActionType, setAppStatus,
    SetAppStatusActionType,
} from '../../app/appReducer';
import {
    handleServerAppError, handleServerNetworkError
} from '../../utils/errorUtils';

const initialState: TodolistDomainType[] = [];

const todolistsReducer = (
    state: TodolistDomainType[] = initialState,
    action: TodolistsActionsType
): TodolistDomainType[] => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.payload.todolists.map(todolist => ({
                ...todolist, filter: 'all', entityStatus: 'idle'
            }));
        case 'ADD-TODOLIST':
            return [ {
                ...action.payload.todolist, filter: 'all', entityStatus: 'idle'
            }, ...state ];
        case 'DELETE-TODOLIST':
            return state.filter(
                todolist => todolist.id !== action.payload.todolistId);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(
                todolist => todolist.id === action.payload.todolistId ?
                    { ...todolist, filter: action.payload.value } : todolist);
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(
                todolist => todolist.id === action.payload.todolistId ?
                    { ...todolist, title: action.payload.title } : todolist);
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(
                todolist => todolist.id === action.payload.todolistId ?
                    { ...todolist, entityStatus: action.payload.entityStatus }
                    : todolist);
        default:
            return state;
    }
};

// actions
const setTodolistsAC = (todolists: TodolistType[]) => ({
    type: 'SET-TODOLISTS',
    payload: { todolists }
} as const);

export const addTodolistAC = (todolist: TodolistType) => ({
    type: 'ADD-TODOLIST',
    payload: { todolist }
} as const);

export const deleteTodolistAC = (todolistId: string) => ({
    type: 'DELETE-TODOLIST',
    payload: { todolistId }
} as const);

export const changeTodolistFilterAC = (
    value: FilterType,
    todolistId: string
) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    payload: { value, todolistId }
} as const);

export const changeTodolistTitleAC = (todolistId: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    payload: { title, todolistId }
} as const);

export const changeTodolistEntityStatusAC = (
    todolistId: string,
    entityStatus: RequestStatusType
) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS',
    payload: { todolistId, entityStatus }
} as const);

// thunks
export const getTodolistsTC = (): AppThunkType => async (dispatch: Dispatch<ActionsType>) => {
    try {
        dispatch(setAppStatus('loading'));
        const res = await todolistAPI.getTodolists();
        dispatch(setAppStatus('succeeded'));
        dispatch(setTodolistsAC(res.data));
    } catch (e) {
        if (axios.isAxiosError<ErrorType>(e)) {
            const error = e.response ?
                e.response?.data.messages[0].message :
                e.message;
            handleServerNetworkError(dispatch, error);
            return;
        }

        const error = (e as Error).message;
        handleServerNetworkError(dispatch, error);
    }
};

export const createTodolistTC = (title: string): AppThunkType => async (
    dispatch: Dispatch<ActionsType>
) => {
    try {
        dispatch(setAppStatus('loading'));
        const res = await todolistAPI.createTodolist(title);
        if (res.data.resultCode === ResultCode.SUCCESS) {
            dispatch(addTodolistAC(res.data.data.item));
            dispatch(setAppStatus('succeeded'));
        } else {
            handleServerAppError(dispatch, res.data);
        }
    } catch (e) {
        if (axios.isAxiosError<ErrorType>(e)) {
            const error = e.response ?
                e.response?.data.messages[0].message :
                e.message;
            handleServerNetworkError(dispatch, error);
            return;
        }

        const error = (e as Error).message;
        handleServerNetworkError(dispatch, error);
    }
};

export const changeTodolistTitleTC = (
    todolistId: string,
    title: string
): AppThunkType => async (dispatch: Dispatch<ActionsType>) => {
    try {
        dispatch(setAppStatus('loading'));
        dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'));
        const res = await todolistAPI.updateTodolistTitle(todolistId, title);
        if (res.data.resultCode === ResultCode.SUCCESS) {
            dispatch(changeTodolistTitleAC(todolistId, title));
            dispatch(setAppStatus('succeeded'));
            dispatch(changeTodolistEntityStatusAC(todolistId, 'idle'));
        } else {
            handleServerAppError(dispatch, res.data);
        }
    } catch (e) {
        if (axios.isAxiosError<ErrorType>(e)) {
            const error = e.response ?
                e.response?.data.messages[0].message :
                e.message;
            handleServerNetworkError(dispatch, error);
            return;
        }

        const error = (e as Error).message;
        handleServerNetworkError(dispatch, error);
    }
};

export const deleteTodolistTC = (todolistId: string): AppThunkType => async (
    dispatch: Dispatch<ActionsType>
) => {
    try {
        dispatch(setAppStatus('loading'));
        dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'));
        const res = await todolistAPI.deleteTodolist(todolistId);
        if (res.data.resultCode === ResultCode.SUCCESS) {
            dispatch(deleteTodolistAC(todolistId));
            dispatch(setAppStatus('succeeded'));
        } else {
            handleServerAppError(dispatch, res.data);
        }
    } catch (e) {
        dispatch(changeTodolistEntityStatusAC(todolistId, 'failed'));

        if (axios.isAxiosError<ErrorType>(e)) {
            const error = e.response ?
                e.response?.data.messages[0].message :
                e.message;
            handleServerNetworkError(dispatch, error);
            return;
        }

        const error = (e as Error).message;
        handleServerNetworkError(dispatch, error);
    }
};

// types
export type FilterType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
    filter: FilterType
    entityStatus: RequestStatusType
}

export type TodolistsActionsType =
    | SetTodolistsAC
    | AddTodolistAC
    | DeleteTodolistAC
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>
    | SetAppStatusActionType
    | SetAppErrorActionType;

export type SetTodolistsAC = ReturnType<typeof setTodolistsAC>;
export type AddTodolistAC = ReturnType<typeof addTodolistAC>;
export type DeleteTodolistAC = ReturnType<typeof deleteTodolistAC>;

export default todolistsReducer;