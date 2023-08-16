import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from 'app/model/store'
import './index.scss'
import { App } from 'app/ui/App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <Provider store={store}>
        <BrowserRouter basename="/todolist">
            <App />
        </BrowserRouter>
    </Provider>,
)
