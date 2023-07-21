import { TodolistDomainType, todolistsActions, todolistsReducer } from '../todolistsReducer'

describe('todolistsReducer', () => {
    let startState: TodolistDomainType[] = []

    beforeEach(() => {
        startState = [
            {
                id: '1',
                addedDate: new Date(),
                order: 0,
                title: 'What to learn',
                filter: 'all',
                entityStatus: 'idle',
            },
            {
                id: '2',
                addedDate: new Date(),
                order: 0,
                title: 'What to buy',
                filter: 'all',
                entityStatus: 'idle',
            },
        ]
    })

    it('should add todolist correctly', () => {
        const newTodos = {
            id: '3',
            addedDate: new Date(),
            order: 0,
            title: 'What to do',
        }

        const action = todolistsActions.addTodolist({ todolist: newTodos })

        const endState = todolistsReducer(startState, action)

        expect(endState.length).toBe(3)
        expect(endState[0].title).toBe('What to do')
        expect(endState[0].filter).toBe('all')
    })

    it('should delete todolist correctly', () => {
        const action = todolistsActions.deleteTodolist({ todolistId: '2' })

        const endState = todolistsReducer(startState, action)

        expect(endState.length).toBe(1)
        expect(endState.every(t => t.id !== '2')).toBeTruthy()
    })

    it('should change todolist filter correctly', () => {
        const action = todolistsActions.changeTodolistFilter({
            filter: 'completed',
            todolistId: '1',
        })

        const endState = todolistsReducer(startState, action)

        expect(endState[0].filter).toBe('completed')
    })

    it('should change todolist title correctly', () => {
        const action = todolistsActions.changeTodolistTitle({ todolistId: '2', title: 'New Title' })

        const endState = todolistsReducer(startState, action)

        expect(endState[1].title).toBe('New Title')
    })
    it('should return the same state if action type is incorrect', () => {
        const action = { type: 'UNKNOWN_ACTION_TYPE' }

        // @ts-ignore
        const endState = todolistsReducer(startState, action)

        expect(endState).toBe(startState)
    })
})
