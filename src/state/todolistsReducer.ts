import { v1 } from 'uuid';
import { TodolistType } from '../api/todolistAPI';

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
    | changeTodolistFilterACType | changeTodolistTitleACType;
export type addTodolistACType = ReturnType<typeof addTodolistAC>;
export type deleteTodolistACType = ReturnType<typeof deleteTodolistAC>;
type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>;
type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>;

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

export default todolistsReducer;