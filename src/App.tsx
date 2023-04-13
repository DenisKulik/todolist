import { useState } from 'react';
import { v1 } from 'uuid';
import './App.scss';
import Todolist from './components/Todolist';

const App = () => {
    const title = 'What to learn';

    const [ tasks, setTask ] = useState([
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false }
    ]);

    const addTask = (titleTask: string) => {
        setTask([ { id: v1(), title: titleTask, isDone: false }, ...tasks ]);
    };

    const deleteTask = (taskId: string): void => {
        setTask(tasks.filter(task => task.id !== taskId));
    };

    return (
        <div className="App">
            <Todolist title={ title } tasks={ tasks }
                      addTask={ addTask }
                      deleteTask={ deleteTask } />
        </div>
    );
};

export default App;