import type { Meta, StoryObj } from '@storybook/react';
import Task from './Task';
import {
    ReduxStoreProviderDecorator
} from '../../../../app/ReduxStoreProviderDecorator';
import { TaskType } from '../../../../api/todolistAPI';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../../../../app/store';

const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    tags: [ 'autodocs' ],
    decorators: [ ReduxStoreProviderDecorator ]
};
export default meta;

type Story = StoryObj<typeof Task>;

const TaskWithRedux = () => {
    const todolistId = 'todolistId1';
    let task = useSelector<AppRootStateType, TaskType>(
        state => state.tasks[todolistId][0]);

    return <Task task={task} todolistId={todolistId} />;
};

export const TaskStory: Story = {
    render: () => <TaskWithRedux />
};
