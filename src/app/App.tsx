import { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import CircularProgress from '@mui/material/CircularProgress'
import ButtonAppBar from 'components/ButtonAppBar/ButtonAppBar'
import { Todolists } from 'features/Todolists/Todolists'
import { ErrorSnackbar } from 'components/ErrorSnackbar/ErrorSnackbar'
import { Login } from 'features/Login/Login'
import { useAppDispatch, useAppSelector } from 'app/store'
import { meTC } from 'features/Login/authReducer'
import { selectIsInitialized } from 'app/app.selectors'

type AppPropsType = {
    demo?: boolean
}

const App = ({ demo = false }: AppPropsType) => {
    const isInitialized = useAppSelector<boolean>(selectIsInitialized)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (demo) return
        dispatch(meTC())
    }, [dispatch])

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
            <ButtonAppBar />
            <Container fixed>
                <Routes>
                    <Route path="/" element={<Todolists demo={demo} />} />
                    <Route path="login" element={<Login />} />
                    <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>} />
                    <Route path="*" element={<Navigate to="/404" />} />
                </Routes>
            </Container>
        </>
    )
}

export default App
