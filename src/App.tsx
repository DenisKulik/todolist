import { useState } from 'react';
import './App.scss';
import Todolist from './Todolist';

const App = () => {
    const title = 'What to learn';

    const [ tasks, setTask ] = useState([
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'ReactJS', isDone: false }
    ]);

    const deleteTask = (taskId: number): void => {
        setTask(tasks.filter(task => task.id !== taskId));
    };

    return (
        <div className="App">
            <Todolist title={ title } tasks={ tasks }
                      deleteTask={ deleteTask } />
        </div>
    );
};

export default App;