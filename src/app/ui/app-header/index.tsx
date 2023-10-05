import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'

import { RequestStatusType } from 'app/model/app.slice'
import { useActions, useAppSelector } from 'common/hooks'
import { authThunks } from 'features/login/model/auth.slice'
import { selectStatus } from 'app/model/app.selectors'
import { selectIsLoggedIn } from 'features/login/model/auth.selectors'
import { S } from './app-header.styles'

type Props = {
    isDarkMode: boolean
    changeMode: () => void
}

export const AppHeader = ({ isDarkMode, changeMode }: Props) => {
    const status = useAppSelector<RequestStatusType>(selectStatus)
    const { logout } = useActions(authThunks)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    const onLogout = () => {
        logout()
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="relative">
                <Toolbar>
                    <S.HeaderWrapper>
                        <Typography variant="h6" component="div">
                            TODOLIST
                        </Typography>
                        <S.ThemeSwitch sx={{ m: 1 }} onChange={changeMode} checked={isDarkMode} />
                    </S.HeaderWrapper>
                    {isLoggedIn && (
                        <Button onClick={onLogout} color="inherit" variant="outlined">
                            Log out
                        </Button>
                    )}
                </Toolbar>
                {status === 'loading' && (
                    <LinearProgress
                        sx={{
                            position: 'absolute',
                            top: 0,
                            width: '100%',
                        }}
                    />
                )}
            </AppBar>
        </Box>
    )
}
