import { useEffect, useState } from 'react'
import styled from 'styled-components'
import CircularProgress from '@mui/material/CircularProgress'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Paper from '@mui/material/Paper'

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
    const [darkMode, setDarkMode] = useState(false)

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
        },
    })

    useEffect(() => {
        if (demo) return
        initializeApp()

        const savedTheme = localStorage.getItem('theme')
        if (savedTheme) setDarkMode(savedTheme === 'dark')
        // eslint-disable-next-line
    }, [])

    const changeMode = () => {
        setDarkMode(prevMode => {
            const newMode = !prevMode
            localStorage.setItem('theme', newMode ? 'dark' : 'light')
            return newMode
        })
    }

    if (!isInitialized) {
        return (
            <CircularProgressWrapper>
                <CircularProgress />
            </CircularProgressWrapper>
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <StyledPaper>
                <ErrorSnackbar />
                <AppHeader isDarkMode={darkMode} changeMode={changeMode} />
                <Routing demo={demo} />
            </StyledPaper>
        </ThemeProvider>
    )
}

// styles
const CircularProgressWrapper = styled.div`
    position: fixed;
    top: 30%;
    text-align: center;
    width: 100%;
`

const StyledPaper = styled(Paper)`
    min-height: 100vh;
`
