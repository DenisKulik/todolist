import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import tasksReducer from '../features/Todolists/tasksReducer';
import todolistsReducer from '../features/Todolists/todolistsReducer';
import { AppRootStateType } from './store';
import { TaskPriorities, TaskStatuses } from '../api/todolistAPI';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
});

export const initialGlobalState: AppRootStateType = {
    todolists: [
        {
            id: 'todolistId1',
            addedDate: new Date(),
            order: 0,
            title: 'What to learn',
            filter: 'all'
        },
        {
            id: 'todolistId2',
            addedDate: new Date(),
            order: 1,
            title: 'What to buy',
            filter: 'all'
        },
    ],
    tasks: {
        ['todolistId1']: [
            {
                description: '',
                title: 'HTML&CSS',
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                startDate: new Date(),
                deadline: new Date(),
                id: 'task1',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: new Date()
            },
            {
                description: '',
                title: 'JavaScript',
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                startDate: new Date(),
                deadline: new Date(),
                id: 'task2',
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
                id: 'task3',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: new Date()
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
                addedDate: new Date()
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
                addedDate: new Date()
            },
        ]
    }
};

export const storyBookStore = legacy_createStore(rootReducer,
    initialGlobalState, applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>;
};
