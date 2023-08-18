import { useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'

import { useActions, useAppSelector } from 'common/hooks'
import { ErrorSnackbar } from 'common/components/error-snackbar'
import { authThunks } from 'features/login/model/auth.slice'
import { selectIsInitialized } from 'app/model/app.selectors'
import { AppHeader } from 'app/ui/app-header'
import { Routing } from 'app/ui/pages'

type Props = {
    demo?: boolean
}

export const App = ({ demo = false }: Props) => {
    const isInitialized = useAppSelector<boolean>(selectIsInitialized)
    const { initializeApp } = useActions(authThunks)

    useEffect(() => {
        if (demo) return
        initializeApp()
        // eslint-disable-next-line
    }, [])

    if (!isInitialized) {
        return (
            <div
                style={{
                    position: 'fixed',
                    top: '30%',
                    textAlign: 'center',
                    width: '100%',
                }}
            >
                <CircularProgress />
            </div>
        )
    }

    return (
        <>
            <ErrorSnackbar />
            <AppHeader />
            <Routing demo={demo} />
        </>
    )
}
