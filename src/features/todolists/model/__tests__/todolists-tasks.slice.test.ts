import {
    TodolistDomainType,
    todolistsSlice,
    todolistsThunks,
} from 'features/todolists/model/todolists.slice'
import { tasksSlice, TasksStateType } from 'features/todolists/model/tasks.slice'

it('should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: TodolistDomainType[] = []

    const newTodos = {
        id: '1',
        addedDate: new Date(),
        order: 0,
        title: 'What to do',
    }

    const action = todolistsThunks.addTodolist.fulfilled(
        { todolist: newTodos },
        'requestId',
        'What to do',
    )

    const endTasksState = tasksSlice(startTasksState, action)
    const endTodolistsState = todolistsSlice(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolist.id)
    expect(idFromTodolists).toBe(action.payload.todolist.id)
})
