import { Route, Routes } from 'react-router-dom';
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
                </Routes>
            </Container>
        </>
    );
};

export default App;