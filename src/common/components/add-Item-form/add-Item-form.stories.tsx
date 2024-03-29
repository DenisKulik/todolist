import type { Meta, StoryObj } from '@storybook/react'
import { AddItemForm } from 'common/components/add-Item-form/index'
import { action } from '@storybook/addon-actions'

const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLISTS/add-Item-form',
    component: AddItemForm,
    tags: ['autodocs'],
    argTypes: {
        addItem: {
            description: 'Button clicked inside form',
        },
    },
}

export default meta
type Story = StoryObj<typeof AddItemForm>

export const AddItemFormStory: Story = {
    args: {
        addItem: () => Promise.resolve(action('Button clicked inside form')),
    },
}
