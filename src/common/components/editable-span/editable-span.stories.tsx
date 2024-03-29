import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { EditableSpan } from 'common/components/editable-span/index'

const meta: Meta<typeof EditableSpan> = {
    title: 'TODOLISTS/editable-span',
    component: EditableSpan,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof EditableSpan>

export const EditableSpanStory: Story = {
    args: {
        title: 'Title',
        callback: action('Value editable-span changed'),
    },
}
