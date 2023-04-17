import { ChangeEvent, KeyboardEvent, useState } from 'react';
import Button from './Button';
import { filterType } from '../App';

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    addTask: (titleTask: string) => void
    deleteTask: (taskId: string) => void
    changeFilter: (value: filterType) => void
    changeTaskStatus: (taskId: string, checkValue: boolean) => void
}

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const Todolist = (props: TodolistPropsType) => {
    const {
        title,
        tasks,
        addTask,
        deleteTask,
        changeFilter,
        changeTaskStatus
    } = props;

    const [ value, setValue ] = useState('');

    const AddTaskHandler = () => {
        if (value.trim() === '') return;

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

    const taskItem = tasks.map(task => {
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(task.id, e.currentTarget.checked);
        };

        return (
            <li key={ task.id }>
                <input type="checkbox" checked={ task.isDone }
                       onChange={ onChangeHandler } />
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
                        callback={ () => changeFilter('all') } />
                <Button name={ 'Active' }
                        callback={ () => changeFilter('active') } />
                <Button name={ 'Completed' }
                        callback={ () => changeFilter('completed') } />
            </div>
        </div>
    );
};

export default Todolist;