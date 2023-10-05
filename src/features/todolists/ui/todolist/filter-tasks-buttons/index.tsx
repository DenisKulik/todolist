import { ComponentType, memo } from 'react'
import styled from 'styled-components'

import { CustomButton } from 'common/components/custom-button'
import { FilterType, todolistsActions } from 'features/todolists/model/todolists.slice'
import { useActions } from 'common/hooks'

type Props = {
    filter: FilterType
    todolistId: string
}
type CustomButtonProps = typeof CustomButton extends ComponentType<infer P> ? P : never

export const FilterTasksButtons = memo(({ filter, todolistId }: Props) => {
    const { changeTodolistFilter } = useActions(todolistsActions)

    const createButton = (
        title: string,
        targetFilter: FilterType,
        color: CustomButtonProps['color'],
    ) => (
        <CustomButton
            title={title}
            variant={filter === targetFilter ? 'outlined' : 'text'}
            color={color}
            size="small"
            onClick={() => changeTodolistFilter({ filter: targetFilter, todolistId })}
        />
    )

    return (
        <StyledFilterTasksButtons>
            {createButton('all', 'all', 'primary')}
            {createButton('active', 'active', 'secondary')}
            {createButton('completed', 'completed', 'success')}
        </StyledFilterTasksButtons>
    )
})

// styles
const StyledFilterTasksButtons = styled.div`
    display: flex;
    gap: 5px;
`
