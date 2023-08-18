import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers } from 'redux'
import { tasksSlice } from 'features/todolists/model/tasks.slice'
import { todolistsSlice } from 'features/todolists/model/todolists.slice'
import { AppRootStateType, RootReducerType } from 'app/model/store'

import { appSlice } from 'app/model/app.slice'
import { authSlice } from 'features/login/model/auth.slice'
import { configureStore } from '@reduxjs/toolkit'
import { TaskPriorities, TaskStatuses } from 'common/enums'

const rootReducer: RootReducerType = combineReducers({
    tasks: tasksSlice,
    todolists: todolistsSlice,
    app: appSlice,
    auth: authSlice,
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
            entityStatus: 'idle',
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
        status: 'idle',
        error: null,
        isInitialized: true,
    },
    auth: {
        isLoggedIn: true,
        captchaUrl: '',
    },
}

export const storyBookStore = configureStore({
    reducer: rootReducer,
    preloadedState: initialGlobalState,
})

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
