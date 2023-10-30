import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from 'app/model/store'
import { App } from 'app/ui/app'
import { Global } from 'styles'

import 'overlayscrollbars/css/OverlayScrollbars.min.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <Provider store={store}>
        <BrowserRouter basename="/todolist">
            <Global />
            <App />
        </BrowserRouter>
    </Provider>,
)
