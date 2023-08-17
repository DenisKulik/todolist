import {
    TodolistDomainType,
    todolistsActions,
    todolistsSlice,
    todolistsThunks,
} from 'features/todolists-list/todolists/model/todolists.slice'

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

    it('should add Todolist correctly', () => {
        const newTodos = {
            id: '3',
            addedDate: new Date(),
            order: 0,
            title: 'What to do',
        }

        const action = todolistsThunks.addTodolist.fulfilled(
            { todolist: newTodos },
            'requestId',
            'What to do',
        )

        const endState = todolistsSlice(startState, action)

        expect(endState.length).toBe(3)
        expect(endState[0].title).toBe('What to do')
        expect(endState[0].filter).toBe('all')
    })

    it('should delete Todolist correctly', () => {
        const action = todolistsThunks.deleteTodolist.fulfilled(
            { todolistId: '2' },
            'requestId',
            '2',
        )

        const endState = todolistsSlice(startState, action)

        expect(endState.length).toBe(1)
        expect(endState.every(t => t.id !== '2')).toBeTruthy()
    })

    it('should change Todolist filter correctly', () => {
        const action = todolistsActions.changeTodolistFilter({
            filter: 'completed',
            todolistId: '1',
        })

        const endState = todolistsSlice(startState, action)

        expect(endState[0].filter).toBe('completed')
    })

    it('should change Todolist title correctly', () => {
        const args = { todolistId: '2', title: 'New Title' }
        const action = todolistsThunks.updateTodolistTitle.fulfilled(args, 'requestId', args)
        const endState = todolistsSlice(startState, action)

        expect(endState[1].title).toBe('New Title')
    })
    it('should return the same state if action type is incorrect', () => {
        const action = { type: 'UNKNOWN_ACTION_TYPE' }
        // @ts-ignore
        const endState = todolistsSlice(startState, action)

        expect(endState).toBe(startState)
    })
})