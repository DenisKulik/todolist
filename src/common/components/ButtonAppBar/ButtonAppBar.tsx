import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import LinearProgress from '@mui/material/LinearProgress'
import { RequestStatusType } from 'app/app.reducer'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { logoutTC } from 'features/auth/auth.reducer'
import { selectStatus } from 'app/app.selectors'

const ButtonAppBar = () => {
    const status = useAppSelector<RequestStatusType>(selectStatus)
    const dispatch = useAppDispatch()

    const logout = () => {
        dispatch(logoutTC())
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
                    <Button onClick={logout} color="inherit">
                        Log out
                    </Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress />}
            </AppBar>
        </Box>
    )
}

export default ButtonAppBar
