import styled from 'styled-components'

import { Task } from 'features/todolists-list/tasks/ui/Task'
import { getFilteredTasks } from 'common/utils'
import { useAppSelector } from 'common/hooks'
import { TaskDomainType } from 'features/todolists-list/tasks/model/tasks.slice'
import { selectTasks } from 'features/todolists-list/tasks/model/tasks.selectors'
import { FilterType } from 'features/todolists-list/todolists/model/todolists.slice'

type Props = {
    filter: FilterType
    todolistId: string
}

export const Tasks = ({ filter, todolistId }: Props) => {
    const tasks = useAppSelector<TaskDomainType[]>(state => selectTasks(state, todolistId))
    const tasksForTodolist = getFilteredTasks(tasks, filter)

    const tasksItems: JSX.Element[] = tasksForTodolist.map(task => {
        return <Task key={task.id} task={task} />
    })

    return <TasksWrapper>{tasksItems}</TasksWrapper>
}

const TasksWrapper = styled.div`
    margin-bottom: 10px;
`
