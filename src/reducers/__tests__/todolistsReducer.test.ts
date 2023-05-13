import todolistsReducer, {
    addTodolistAC,
    deleteTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
} from '../todolistsReducer';
import { TodolistType } from '../../App';

describe('todolistsReducer', () => {
    let startState: TodolistType[] = [];

    beforeEach(() => {
        startState = [
            { id: '1', title: 'What to learn', filter: 'all' },
            { id: '2', title: 'What to buy', filter: 'all' },
        ];
    });

    it('should add todolist correctly', () => {
        const newTodolist: TodolistType = {
            id: '3',
            title: 'New Todolist',
            filter: 'all'
        };
        const action = addTodolistAC(newTodolist);

        const endState = todolistsReducer(startState, action);

        expect(endState.length).toBe(3);
        expect(endState[0].id).toBe('3');
        expect(endState[0].title).toBe('New Todolist');
        expect(endState[0].filter).toBe('all');
    });

    it('should delete todolist correctly', () => {
        const action = deleteTodolistAC('2');

        const endState = todolistsReducer(startState, action);

        expect(endState.length).toBe(1);
        expect(endState.every(t => t.id !== '2')).toBeTruthy();
    });

    it('should change todolist filter correctly', () => {
        const action = changeTodolistFilterAC('completed', '1');

        const endState = todolistsReducer(startState, action);

        expect(endState[0].filter).toBe('completed');
    });

    it('should change todolist title correctly', () => {
        const action = changeTodolistTitleAC('New Title', '2');

        const endState = todolistsReducer(startState, action);

        expect(endState[1].title).toBe('New Title');
    });

    it('should throw an error for incorrect action type', () => {

        expect(
            // @ts-ignore
            () => todolistsReducer(startState, { type: 'UNKNOWN_ACTION_TYPE' }))
        .toThrow();
    });
});