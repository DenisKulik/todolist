import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, legacy_createStore } from 'redux';
import tasksReducer from './tasksReducer';
import todolistsReducer from './todolistsReducer';
import { AppRootStateType } from './store';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
});

export const initialGlobalState = {
    todolists: [
        { id: 'todolistId1', title: 'What to learn', filter: 'all' },
        { id: 'todolistId2', title: 'What to buy', filter: 'all' }
    ],
    tasks: {
        ['todolistId1']: [
            { id: 'task1', title: 'HTML&CSS', isDone: true },
            { id: 'task2', title: 'JS', isDone: false }
        ],
        ['todolistId2']: [
            { id: 'task3', title: 'Milk', isDone: false },
            { id: 'task4', title: 'React Book', isDone: true }
        ]
    }
};

export const storyBookStore = legacy_createStore(rootReducer,
    initialGlobalState as AppRootStateType);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>;
};
