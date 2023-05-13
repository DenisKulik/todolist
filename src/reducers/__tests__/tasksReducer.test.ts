import tasksReducer, {
    addTaskAC,
    deleteTaskAC,
    createNewTasksTemplateAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
} from '../tasksReducer';

describe('tasksReducer', () => {
    let startState = {};

    beforeEach(() => {
        startState = {
            'todolistId1': [
                { id: '1', title: 'HTML&CSS', isDone: true },
                { id: '2', title: 'JS', isDone: false },
                { id: '3', title: 'React', isDone: true },
            ],
            'todolistId2': [
                { id: '1', title: 'bread', isDone: true },
                { id: '2', title: 'milk', isDone: false },
                { id: '3', title: 'sugar', isDone: true },
            ],
        };
    });

    it('should add task correctly', () => {
        const newTask = { id: '4', title: 'Redux', isDone: false };
        const action = addTaskAC(newTask, 'todolistId2');

        const endState = tasksReducer(startState, action);

        expect(endState['todolistId2'].length).toBe(4);
        expect(endState['todolistId2'][0].id).toBe('4');
        expect(endState['todolistId2'][0].title).toBe('Redux');
        expect(endState['todolistId2'][0].isDone).toBe(false);
    });

    it('should delete task correctly', () => {
        const action = deleteTaskAC('2', 'todolistId2');

        const endState = tasksReducer(startState, action);

        expect(endState['todolistId2'].length).toBe(2);
        expect(endState['todolistId2'].every(t => t.id !== '2')).toBeTruthy();
    });

    it('should create new tasks template correctly', () => {
        const action = createNewTasksTemplateAC('todolistId2');

        const endState = tasksReducer(startState, action);

        expect(endState['todolistId2'].length).toBe(0);
    });

    it('should change task status correctly', () => {
        const action = changeTaskStatusAC('2', true, 'todolistId2');

        const endState = tasksReducer(startState, action);

        expect(endState['todolistId2'][1].isDone).toBeTruthy();
    });

    it('should change task title correctly', () => {
        const action = changeTaskTitleAC('2', 'water', 'todolistId2');

        const endState = tasksReducer(startState, action);

        expect(endState['todolistId2'][1].title).toBe('water');
    });

    it('should throw an error for incorrect action type', () => {
        // @ts-ignore
        expect(() => tasksReducer(startState, { type: 'UNKNOWN_ACTION_TYPE' }))
        .toThrow();
    });
});