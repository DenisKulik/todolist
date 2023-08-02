import { tasksReducer, TasksStateType, tasksThunks } from 'features/Todolists/tasks.reducer'
import { TaskPriorities, TaskStatuses } from 'common/enums'
import { todolistsThunks } from 'features/Todolists/todolists.reducer'
import { UpdateTaskModelType } from 'features/Todolists/todolists.api'

describe('tasksReducer', () => {
    let startState: TasksStateType = {}

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
                    addedDate: new Date(),
                    entityStatus: 'idle',
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
                    addedDate: new Date(),
                    entityStatus: 'idle',
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
                    addedDate: new Date(),
                    entityStatus: 'idle',
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
                    addedDate: new Date(),
                    entityStatus: 'idle',
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
                    addedDate: new Date(),
                    entityStatus: 'idle',
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
                    addedDate: new Date(),
                    entityStatus: 'idle',
                },
            ],
        }
    })

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
            addedDate: new Date(),
        }

        const action = tasksThunks.addTask.fulfilled({ task: newTask }, 'requestId', {
            todolistId: 'todolistId2',
            title: 'React book',
        })

        const endState = tasksReducer(startState, action)

        expect(endState['todolistId2'].length).toBe(4)
        expect(endState['todolistId2'][0].title).toBe('React book')
        expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
    })

    it('should delete task correctly', () => {
        const args = { todolistId: 'todolistId2', taskId: '2' }
        const action = tasksThunks.deleteTask.fulfilled(args, 'requestId', args)
        const endState = tasksReducer(startState, action)

        expect(endState['todolistId2'].length).toBe(2)
        expect(endState['todolistId2'].every(t => t.id !== '2')).toBeTruthy()
    })

    it('should update task correctly', () => {
        const updatedTask: UpdateTaskModelType = {
            title: 'eggs',
            description: '',
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Middle,
            startDate: new Date(),
            deadline: new Date(),
        }
        const arg = { todolistId: 'todolistId2', taskId: '2', model: updatedTask }
        const action = tasksThunks.updateTask.fulfilled(arg, 'requestId', arg)
        const endState = tasksReducer(startState, action)

        expect(endState['todolistId2'][1].status).toBe(TaskStatuses.Completed)
        expect(endState['todolistId2'][1].title).toBe('eggs')
    })

    it('should delete tasks for todolist correctly', () => {
        const action = todolistsThunks.deleteTodolist.fulfilled(
            { todolistId: 'todolistId2' },
            'requestId',
            'todolistId2',
        )

        const endState = tasksReducer(startState, action)

        const keys = Object.keys(endState)

        expect(keys.length).toBe(1)
        expect(endState['todolistId2']).not.toBeDefined()
    })

    it('should return the same state if action type is incorrect', () => {
        const action = { type: 'UNKNOWN_ACTION_TYPE' }
        // @ts-ignore
        const endState = tasksReducer(startState, action)

        expect(endState).toBe(startState)
    })
})
