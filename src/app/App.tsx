import Container from '@mui/material/Container';
import ButtonAppBar from '../components/ButtonAppBar/ButtonAppBar';
import { Todolists } from '../features/Todolists/Todolists';

const App = () => {
    return (
        <>
            <ButtonAppBar />
            <Container fixed>
                <Todolists />
            </Container>
        </>
    );
};

export default App;