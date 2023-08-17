import { tasksSlice, TasksStateType, tasksThunks } from 'features/todolists/model/tasks.slice'
import { TaskPriorities, TaskStatuses } from 'common/enums'
import { todolistsThunks } from 'features/todolists/model/todolists.slice'
import { UpdateTaskModelType } from 'features/todolists/api/types/tasks.api.types'
import { createFulfilledAction } from 'common/utils'

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

    it('should add tasks correctly', () => {
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

        const action = createFulfilledAction(tasksThunks.addTask, {
            task: newTask,
        })
        const endState = tasksSlice(startState, action)

        expect(endState['todolistId2'].length).toBe(4)
        expect(endState['todolistId2'][0].title).toBe('React book')
        expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
    })

    it('should delete tasks correctly', () => {
        const args = { todolistId: 'todolistId2', taskId: '2' }
        const action = createFulfilledAction(tasksThunks.deleteTask, args)
        const endState = tasksSlice(startState, action)

        expect(endState['todolistId2'].length).toBe(2)
        expect(endState['todolistId2'].every(t => t.id !== '2')).toBeTruthy()
    })

    it('should update tasks correctly', () => {
        const updatedTask: UpdateTaskModelType = {
            title: 'eggs',
            description: '',
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Middle,
            startDate: new Date(),
            deadline: new Date(),
        }
        const args = { todolistId: 'todolistId2', taskId: '2', model: updatedTask }
        const action = createFulfilledAction(tasksThunks.updateTask, args)
        const endState = tasksSlice(startState, action)

        expect(endState['todolistId2'][1].status).toBe(TaskStatuses.Completed)
        expect(endState['todolistId2'][1].title).toBe('eggs')
    })

    it('should delete tasks for Todolist correctly', () => {
        const action = createFulfilledAction(todolistsThunks.deleteTodolist, {
            todolistId: 'todolistId2',
        })
        const endState = tasksSlice(startState, action)
        const keys = Object.keys(endState)

        expect(keys.length).toBe(1)
        expect(endState['todolistId2']).not.toBeDefined()
    })

    it('should return the same state if action type is incorrect', () => {
        const action = { type: 'UNKNOWN_ACTION_TYPE' }
        // @ts-ignore
        const endState = tasksSlice(startState, action)

        expect(endState).toBe(startState)
    })
})
