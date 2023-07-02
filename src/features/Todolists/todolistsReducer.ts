import { todolistAPI, TodolistType } from '../../api/todolistAPI';
import { Dispatch } from 'redux';
import { AppActionsType } from '../../app/store';

const initialState: TodolistDomainType[] = [];

const todolistsReducer = (
    state: TodolistDomainType[] = initialState,
    action: AppActionsType
): TodolistDomainType[] => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.payload.todolists.map(todolist => ({
                ...todolist, filter: 'all'
            }));
        case 'ADD-TODOLIST':
            return [ { ...action.payload.todolist, filter: 'all' }, ...state ];
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

// thunks
export const createTodolistsTC = (title: string) => (
    dispatch: Dispatch<AppActionsType>
) => {
    todolistAPI
        .createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item));
        });
};

export const getTodolistsTC = () => (dispatch: Dispatch<AppActionsType>) => {
    todolistAPI
        .getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data));
        });
};

export const changeTodolistTitleTC = (
    todolistId: string,
    title: string
) => (dispatch: Dispatch<AppActionsType>) => {
    todolistAPI
        .updateTodolistTitle(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC(todolistId, title));
            }
        });
};

export const deleteTodolistTC = (todolistId: string) => (
    dispatch: Dispatch<AppActionsType>
) => {
    todolistAPI
        .deleteTodolist(todolistId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(deleteTodolistAC(todolistId));
            }
        });
};

// types
export type FilterType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
    filter: FilterType
}

export type TodolistsActionsType =
    | SetTodolistsAC
    | AddTodolistAC
    | DeleteTodolistAC
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistTitleAC>;

export type SetTodolistsAC = ReturnType<typeof setTodolistsAC>;
export type AddTodolistAC = ReturnType<typeof addTodolistAC>;
export type DeleteTodolistAC = ReturnType<typeof deleteTodolistAC>;

export default todolistsReducer;