import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import LinearProgress from '@mui/material/LinearProgress'

import { RequestStatusType } from 'app/model/app.slice'
import { useActions, useAppSelector } from 'common/hooks'
import { authThunks } from 'features/login/model/auth.slice'
import { selectStatus } from 'app/model/app.selectors'

export const ButtonAppBar = () => {
    const status = useAppSelector<RequestStatusType>(selectStatus)
    const { logout } = useActions(authThunks)

    const onLogout = () => {
        logout()
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Todolist
                    </Typography>
                    <Button onClick={onLogout} color="inherit">
                        Log out
                    </Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress />}
            </AppBar>
        </Box>
    )
}
