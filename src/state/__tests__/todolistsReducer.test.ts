import todolistsReducer, {
    addTodolistAC,
    deleteTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    TodolistDomainType,
} from '../todolistsReducer';

describe('todolistsReducer', () => {
    let startState: TodolistDomainType[] = [];

    beforeEach(() => {
        startState = [
            {
                id: '1',
                addedDate: new Date(),
                order: 0,
                title: 'What to learn',
                filter: 'all'
            },
            {
                id: '2',
                addedDate: new Date(),
                order: 0,
                title: 'What to buy',
                filter: 'all'
            },
        ];
    });

    it('should add todolist correctly', () => {
        const newTodos = {
            id: '3',
            addedDate: new Date(),
            order: 0,
            title: 'What to do'
        };

        const action = addTodolistAC(newTodos);

        const endState = todolistsReducer(startState, action);

        expect(endState.length).toBe(3);
        expect(endState[0].title).toBe('What to do');
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
        const action = changeTodolistTitleAC('2', 'New Title');

        const endState = todolistsReducer(startState, action);

        expect(endState[1].title).toBe('New Title');
    });
    it('should return the same state if action type is incorrect', () => {
        const action = { type: 'UNKNOWN_ACTION_TYPE' };

        // @ts-ignore
        const endState = todolistsReducer(startState, action);

        expect(endState).toBe(startState);
    });
});