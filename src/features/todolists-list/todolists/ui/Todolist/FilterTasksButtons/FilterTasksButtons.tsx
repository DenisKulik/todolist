import { memo } from 'react'

import { CustomButton } from 'common/components/CustomButton/CustomButton'
import {
    FilterType,
    todolistsActions,
} from 'features/todolists-list/todolists/model/todolists.slice'
import { useActions } from 'common/hooks'

type Props = {
    filter: FilterType
    todolistId: string
}

export const FilterTasksButtons = memo(({ filter, todolistId }: Props) => {
    const { changeTodolistFilter } = useActions(todolistsActions)

    const onChangeTodolistFilter = (filter: FilterType) => {
        changeTodolistFilter({ filter, todolistId })
    }

    return (
        <div>
            <CustomButton
                title="all"
                variant={filter === 'all' ? 'outlined' : 'text'}
                color="primary"
                size="small"
                onClick={() => onChangeTodolistFilter('all')}
            />
            <CustomButton
                title="active"
                variant={filter === 'active' ? 'outlined' : 'text'}
                color="secondary"
                size="small"
                onClick={() => onChangeTodolistFilter('active')}
            />
            <CustomButton
                title="completed"
                variant={filter === 'completed' ? 'outlined' : 'text'}
                color="success"
                size="small"
                onClick={() => onChangeTodolistFilter('completed')}
            />
        </div>
    )
})
