import { v1 } from 'uuid';
import { todolistAPI, TodolistType } from '../api/todolistAPI';
import { Dispatch } from 'redux';

export type FilterType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
    filter: FilterType
}

const initialState: TodolistDomainType[] = [];

const todolistsReducer = (
    state: TodolistDomainType[] = initialState,
    action: ActionTypes
): TodolistDomainType[] => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.payload.todolists.map(todolist => ({
                ...todolist, filter: 'all'
            }));
        case 'ADD-TODOLIST':
            return [ {
                id: action.payload.todolistId,
                addedDate: new Date(),
                order: 0,
                title: action.payload.title,
                filter: 'all'
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
        default:
            return state;
    }
};

type ActionTypes = addTodolistACType | deleteTodolistACType
    | changeTodolistFilterACType | changeTodolistTitleACType
    | setTodolistsACType;

export type setTodolistsACType = ReturnType<typeof setTodolistsAC>;
export type addTodolistACType = ReturnType<typeof addTodolistAC>;
export type deleteTodolistACType = ReturnType<typeof deleteTodolistAC>;
type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>;
type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>;

const setTodolistsAC = (todolists: TodolistType[]) => {
    return {
        type: 'SET-TODOLISTS',
        payload: { todolists }
    } as const;
};

export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: { title, todolistId: v1() }
    } as const;
};

export const deleteTodolistAC = (todolistId: string) => {
    return {
        type: 'DELETE-TODOLIST',
        payload: { todolistId }
    } as const;
};

export const changeTodolistFilterAC = (
    value: FilterType,
    todolistId: string
) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: { value, todolistId }
    } as const;
};

export const changeTodolistTitleAC = (title: string, todolistId: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: { title, todolistId }
    } as const;
};

export const getTodolists = (dispatch: Dispatch) => {
    todolistAPI
        .getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data));
        });
};


export default todolistsReducer;