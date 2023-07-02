import todolistsReducer, {
    addTodolistAC, TodolistDomainType
} from '../todolistsReducer';
import tasksReducer, { TasksStateType } from '../tasksReducer';

it('should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: TodolistDomainType[] = [];

    const newTodos = {
        id: '1',
        addedDate: new Date(),
        order: 0,
        title: 'What to do'
    };

    const action = addTodolistAC(newTodos);

    const endTasksState = tasksReducer(startTasksState, action);
    const endTodolistsState = todolistsReducer(startTodolistsState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolist.id);
    expect(idFromTodolists).toBe(action.payload.todolist.id);
});
