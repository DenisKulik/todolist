import { ChangeEvent, KeyboardEvent, useState } from 'react';
import Button from './Button';

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    addTask: (titleTask: string) => void
    deleteTask: (taskId: string) => void
}

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type filterType = 'all' | 'active' | 'completed'

const Todolist = (props: TodolistPropsType) => {
    const { title, tasks, addTask, deleteTask } = props;

    const [ filterType, setFilterType ] = useState<filterType>('all');
    const [ value, setValue ] = useState('');

    const AddTaskHandler = () => {
        addTask(value);
        setValue('');
    };
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    };
    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        return e.key === 'Enter' && AddTaskHandler();
    };
    const deleteTaskHandler = (id: string) => deleteTask(id);

    let filteredTasks = tasks;

    switch (filterType) {
        case 'all':
            filteredTasks = tasks;
            break;
        case 'active':
            filteredTasks = tasks.filter(task => !task.isDone);
            break;
        case 'completed':
            filteredTasks = tasks.filter(task => task.isDone);
            break;
    }

    const taskItem = filteredTasks.map(task => {
        return (
            <li key={ task.id }>
                <input type="checkbox" checked={ task.isDone } />
                <span>{ task.title }</span>
                <Button name={ 'X' }
                        callback={ () => deleteTaskHandler(task.id) } />
            </li>
        );
    });

    return (
        <div>
            <h3>{ title }</h3>
            <div>
                <input onChange={ onChangeHandler } onKeyUp={ onKeyUpHandler }
                       value={ value } />
                <Button name={ '+' } callback={ AddTaskHandler } />
            </div>
            <ul>
                { taskItem }
            </ul>
            <div>
                <Button name={ 'All' }
                        callback={ () => setFilterType('all') } />
                <Button name={ 'Active' }
                        callback={ () => setFilterType('active') } />
                <Button name={ 'Completed' }
                        callback={ () => setFilterType('completed') } />
            </div>
        </div>
    );
};

export default Todolist;