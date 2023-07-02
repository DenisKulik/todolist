import tasksReducer, {
    addTaskAC,
    deleteTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC, TasksStateType,
} from '../tasksReducer';
import { deleteTodolistAC } from '../todolistsReducer';
import { TaskPriorities, TaskStatuses } from '../../api/todolistAPI';

describe('tasksReducer', () => {
    let startState: TasksStateType = {};

    beforeEach(() => {
        startState = {
            ['todolistId1']: [
                {
                    description: '',
                    title: 'HTML&CSS',
                    completed: false,
                    status: TaskStatuses.Completed,
                    priority: TaskPriorities.Hi,
                    startDate: new Date(),
                    deadline: new Date(),
                    id: '1',
                    todoListId: 'todolistId1',
                    order: 0,
                    addedDate: new Date()
                },
                {
                    description: '',
                    title: 'JS',
                    completed: false,
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Hi,
                    startDate: new Date(),
                    deadline: new Date(),
                    id: '2',
                    todoListId: 'todolistId1',
                    order: 0,
                    addedDate: new Date()
                },
                {
                    description: '',
                    title: 'React',
                    completed: false,
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Hi,
                    startDate: new Date(),
                    deadline: new Date(),
                    id: '3',
                    todoListId: 'todolistId1',
                    order: 0,
                    addedDate: new Date()
                },
            ],
            ['todolistId2']: [
                {
                    description: '',
                    title: 'bread',
                    completed: false,
                    status: TaskStatuses.Completed,
                    priority: TaskPriorities.Hi,
                    startDate: new Date(),
                    deadline: new Date(),
                    id: '1',
                    todoListId: 'todolistId1',
                    order: 0,
                    addedDate: new Date()
                },
                {
                    description: '',
                    title: 'milk',
                    completed: false,
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Hi,
                    startDate: new Date(),
                    deadline: new Date(),
                    id: '2',
                    todoListId: 'todolistId1',
                    order: 0,
                    addedDate: new Date()
                },
                {
                    description: '',
                    title: 'sugar',
                    completed: false,
                    status: TaskStatuses.Completed,
                    priority: TaskPriorities.Hi,
                    startDate: new Date(),
                    deadline: new Date(),
                    id: '3',
                    todoListId: 'todolistId1',
                    order: 0,
                    addedDate: new Date()
                },
            ],
        };
    });

    it('should add task correctly', () => {
        const newTask = {
            description: '',
            title: 'React book',
            completed: false,
            status: TaskStatuses.New,
            priority: TaskPriorities.Hi,
            startDate: new Date(),
            deadline: new Date(),
            id: '4',
            todoListId: 'todolistId2',
            order: 0,
            addedDate: new Date()
        };

        const action = addTaskAC(newTask);

        const endState = tasksReducer(startState, action);

        expect(endState['todolistId2'].length).toBe(4);
        expect(endState['todolistId2'][0].title).toBe('React book');
        expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New);
    });

    it('should delete task correctly', () => {
        const action = deleteTaskAC('todolistId2', '2');

        const endState = tasksReducer(startState, action);

        expect(endState['todolistId2'].length).toBe(2);
        expect(endState['todolistId2'].every(t => t.id !== '2')).toBeTruthy();
    });

    it('should change task status correctly', () => {
        const action = changeTaskStatusAC('2', TaskStatuses.Completed,
            'todolistId2');

        const endState = tasksReducer(startState, action);

        expect(endState['todolistId2'][1].status).toBe(TaskStatuses.Completed);
    });

    it('should change task title correctly', () => {
        const action = changeTaskTitleAC('2', 'water', 'todolistId2');

        const endState = tasksReducer(startState, action);

        expect(endState['todolistId2'][1].title).toBe('water');
    });

    it('should delete tasks for todolist correctly', () => {
        const action = deleteTodolistAC('todolistId2');

        const endState = tasksReducer(startState, action);

        const keys = Object.keys(endState);

        expect(keys.length).toBe(1);
        expect(endState['todolistId2']).not.toBeDefined();
    });

    it('should return the same state if action type is incorrect', () => {
        const action = { type: 'UNKNOWN_ACTION_TYPE' };

        // @ts-ignore
        const endState = tasksReducer(startState, action);

        expect(endState).toBe(startState);
    });
});