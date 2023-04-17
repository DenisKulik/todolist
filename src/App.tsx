import { useState } from 'react';
import { v1 } from 'uuid';
import './App.scss';
import Todolist from './components/Todolist';

export type filterType = 'all' | 'active' | 'completed'

const App = () => {
    const [ filterType, setFilterType ] = useState<filterType>('all');

    const [ tasks, setTask ] = useState([
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false },
        { id: v1(), title: 'Rest API', isDone: false },
        { id: v1(), title: 'GraphQL', isDone: false },
    ]);

    const addTask = (titleTask: string) => {
        setTask([ { id: v1(), title: titleTask, isDone: false }, ...tasks ]);
    };

    const deleteTask = (taskId: string): void => {
        setTask(tasks.filter(task => task.id !== taskId));
    };

    const changeFilter = (value: filterType) => setFilterType(value);

    let tasksForTodolist = tasks;

    switch (filterType) {
        case 'all':
            tasksForTodolist = tasks;
            break;
        case 'active':
            tasksForTodolist = tasks.filter(task => !task.isDone);
            break;
        case 'completed':
            tasksForTodolist = tasks.filter(task => task.isDone);
            break;
    }

    return (
        <div className="App">
            <Todolist title={ 'What to learn' }
                      tasks={ tasksForTodolist }
                      addTask={ addTask }
                      deleteTask={ deleteTask }
                      changeFilter={ changeFilter } />
        </div>
    );
};

export default App;