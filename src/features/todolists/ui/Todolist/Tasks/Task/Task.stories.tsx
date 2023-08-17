import type { Meta, StoryObj } from '@storybook/react'
import { Task } from 'features/todolists/ui/Todolist/Tasks/Task/Task'
import { ReduxStoreProviderDecorator } from 'app/model/ReduxStoreProviderDecorator'
import { useSelector } from 'react-redux'
import { AppRootStateType } from 'app/model/store'
import { TaskDomainType } from 'features/todolists/model/tasks.slice'

const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/tasks',
    component: Task,
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator],
}
export default meta

type Story = StoryObj<typeof Task>

const TaskWithRedux = () => {
    const todolistId = 'todolistId1'
    let task = useSelector<AppRootStateType, TaskDomainType>(state => state.tasks[todolistId][0])

    return <Task task={task} />
}

export const TaskStory: Story = {
    render: () => <TaskWithRedux />,
}
