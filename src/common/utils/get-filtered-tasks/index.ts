import { TaskDomainType } from 'features/todolists/model/tasks.slice'
import { FilterType } from 'features/todolists/model/todolists.slice'
import { TaskStatuses } from 'common/enums'

export const getFilteredTasks = (tasks: TaskDomainType[], filter: FilterType): TaskDomainType[] => {
    switch (filter) {
        case 'active':
            return tasks.filter(task => task.status === TaskStatuses.New)
        case 'completed':
            return tasks.filter(task => task.status === TaskStatuses.Completed)
        default:
            return tasks
    }
}
