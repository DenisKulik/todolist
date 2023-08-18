import Container from '@mui/material/Container'
import { Navigate, Route, Routes } from 'react-router-dom'

import { Todolists } from 'features/todolists/ui/todolists'
import { Login } from 'features/login/ui/login'

type Props = {
    demo: boolean
}

export const Routing = ({ demo }: Props) => {
    return (
        <Container fixed>
            <Routes>
                <Route path="/" element={<Todolists demo={demo} />} />
                <Route path="login" element={<Login />} />
                <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>} />
                <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
        </Container>
    )
}
