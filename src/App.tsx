import { useState } from 'react';
import { v1 } from 'uuid';
import './App.scss';
import Todolist from './components/Todolist/Todolist';

export type filterType = 'all' | 'active' | 'completed'

const App = () => {
    const [ filter, setFilter ] = useState<filterType>('all');

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

    const changeFilter = (value: filterType) => setFilter(value);

    const changeTaskStatus = (taskId: string, value: boolean) => {
        setTask([ ...tasks.map(
            item => item.id === taskId ? { ...item, isDone: value } : item) ]);
    };

    let tasksForTodolist = tasks;

    switch (filter) {
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
                      filter={ filter }
                      addTask={ addTask }
                      deleteTask={ deleteTask }
                      changeFilter={ changeFilter }
                      changeTaskStatus={ changeTaskStatus } />
        </div>
    );
};

export default App;