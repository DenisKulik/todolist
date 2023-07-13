import { Route, Routes, Navigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import ButtonAppBar from '../components/ButtonAppBar/ButtonAppBar';
import { Todolists } from '../features/Todolists/Todolists';
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar';
import { Login } from '../features/Login/Login';

type AppPropsType = {
    demo?: boolean
}

const App = ({ demo = false }: AppPropsType) => {
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
    );
};

export default App;