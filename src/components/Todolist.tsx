import { ChangeEvent, KeyboardEvent, useState } from 'react';
import styles from './Todolist.module.scss';
import Checkbox from './Checkbox';
import Button from './Button';
import { filterType } from '../App';

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    filter: filterType
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
        filter,
        addTask,
        deleteTask,
        changeFilter,
        changeTaskStatus
    } = props;

    const [ value, setValue ] = useState('');
    const [ error, setError ] = useState<string | null>(null);

    const AddTaskHandler = () => {
        if (value.trim() === '') {
            setError('Field is required');
            return;
        }

        addTask(value);
        setValue('');
    };
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setValue(e.currentTarget.value);
    };
    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        return e.key === 'Enter' && AddTaskHandler();
    };
    const deleteTaskHandler = (id: string) => deleteTask(id);
    const changeTaskStatusHandler = (status: boolean, id: string) => {
        changeTaskStatus(id, status);
    };

    const taskItem = tasks.map(task => {
        return (
            <li className={ task.isDone ? styles.isDone : '' } key={ task.id }>
                <Checkbox isDone={ task.isDone }
                          callback={ (changedIsDone) => changeTaskStatusHandler(
                              changedIsDone, task.id) } />
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
                <input className={ error ? styles.error : '' }
                       onChange={ onChangeHandler }
                       onKeyUp={ onKeyUpHandler }
                       value={ value } />
                <Button name={ '+' } callback={ AddTaskHandler } />
            </div>
            {
                error &&
                <div className={ error ? styles.errorMessage : '' }>
                    { error }
                </div>
            }
            <ul>
                { taskItem }
            </ul>
            <div>
                <Button name={ 'all' } filter={ filter }
                        callback={ () => changeFilter('all') } />
                <Button name={ 'active' } filter={ filter }
                        callback={ () => changeFilter('active') } />
                <Button name={ 'completed' } filter={ filter }
                        callback={ () => changeFilter('completed') } />
            </div>
        </div>
    );
};

export default Todolist;