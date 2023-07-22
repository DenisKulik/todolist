import React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunk from 'redux-thunk'
import { tasksReducer } from 'features/Todolists/tasksReducer'
import { todolistsReducer } from 'features/Todolists/todolistsReducer'
import { AppRootStateType } from './store'
import { TaskPriorities, TaskStatuses } from 'api/todolistAPI'
import { appReducer } from './appReducer'
import { authReducer } from 'features/Login/authReducer'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})

export const initialGlobalState: AppRootStateType = {
    todolists: [
        {
            id: 'todolistId1',
            addedDate: new Date(),
            order: 0,
            title: 'What to learn',
            filter: 'all',
            entityStatus: 'idle',
        },
        {
            id: 'todolistId2',
            addedDate: new Date(),
            order: 1,
            title: 'What to buy',
            filter: 'all',
            entityStatus: 'loading',
        },
    ],
    tasks: {
        ['todolistId1']: [
            {
                description: '',
                title: 'HTML&CSS',
                completed: false,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Hi,
                startDate: new Date(),
                deadline: new Date(),
                id: 'task1',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: new Date(),
                entityStatus: 'idle',
            },
            {
                description: '',
                title: 'JavaScript',
                completed: false,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Hi,
                startDate: new Date(),
                deadline: new Date(),
                id: 'task2',
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
                id: 'task3',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: new Date(),
                entityStatus: 'idle',
            },
        ],
        ['todolistId2']: [
            {
                description: '',
                title: 'React Book',
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                startDate: new Date(),
                deadline: new Date(),
                id: 'task4',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: new Date(),
                entityStatus: 'idle',
            },
            {
                description: '',
                title: 'Milk',
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                startDate: new Date(),
                deadline: new Date(),
                id: 'task5',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: new Date(),
                entityStatus: 'idle',
            },
        ],
    },
    app: {
        status: 'loading',
        error: null,
        isInitialized: true,
    },
    auth: {
        isLoggedIn: true,
    },
}

export const storyBookStore = legacy_createStore(
    rootReducer,
    initialGlobalState,
    applyMiddleware(thunk),
)

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
