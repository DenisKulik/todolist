import Container from '@mui/material/Container';
import ButtonAppBar from '../components/ButtonAppBar/ButtonAppBar';
import { Todolists } from '../features/Todolists/Todolists';
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar';

type AppPropsType = {
    demo?: boolean
}

const App = ({ demo = false }: AppPropsType) => {
    return (
        <>
            <ErrorSnackbar />
            <ButtonAppBar />
            <Container fixed>
                <Todolists demo={demo} />
            </Container>
        </>
    );
};

export default App;