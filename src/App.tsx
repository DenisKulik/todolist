import { useState } from 'react';
import { v1 } from 'uuid';
import './App.scss';
import Todolist from './components/Todolist/Todolist';

export type FilterType = 'all' | 'active' | 'completed'
export type TaskType = {
    id: string
    title: string,
    isDone: boolean
}

const App = () => {
    const todolistTitle = 'What to learn';

    const [ filter, setFilter ] = useState<FilterType>('all');
    const [ tasks, setTask ] = useState<TaskType[]>([
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

    const changeFilter = (value: FilterType) => setFilter(value);

    const changeTaskStatus = (taskId: string, value: boolean) => {
        setTask([ ...tasks.map(
            item => item.id === taskId ? { ...item, isDone: value } : item) ]);
    };


    const getFilteredTasks = (tasks: TaskType[], filter: FilterType) => {
        switch (filter) {
            case 'active':
                return tasks.filter(task => !task.isDone);
            case 'completed':
                return tasks.filter(task => task.isDone);
            default:
                return tasks;
        }
    };

    let tasksForTodolist = getFilteredTasks(tasks, filter);

    return (
        <div className="App">
            <Todolist title={ todolistTitle }
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