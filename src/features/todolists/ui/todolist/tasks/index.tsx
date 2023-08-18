import styled from 'styled-components'

import { Task } from 'features/todolists/ui/todolist/tasks/task'
import { getFilteredTasks } from 'common/utils'
import { useAppSelector } from 'common/hooks'
import { TaskDomainType } from 'features/todolists/model/tasks.slice'
import { selectTasks } from 'features/todolists/model/tasks.selectors'
import { FilterType } from 'features/todolists/model/todolists.slice'

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

// styles
const TasksWrapper = styled.div`
    margin-bottom: 10px;
`
