import type { Meta, StoryObj } from '@storybook/react'
import { withRouter } from 'storybook-addon-react-router-v6'
import { App } from 'app/ui/app'
import { ReduxStoreProviderDecorator } from 'app/model/redux-store-provider-decorator'

const meta: Meta<typeof App> = {
    title: 'TODOLISTS/App',
    component: App,
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator, withRouter],
    parameters: {
        reactRouter: {
            routePath: '/',
        },
    },
}
export default meta

type Story = StoryObj<typeof App>

export const AppStory: Story = {
    args: {
        demo: true,
    },
}
