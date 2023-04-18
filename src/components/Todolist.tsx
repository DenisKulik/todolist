import { ChangeEvent, KeyboardEvent, useState } from 'react';
import Button from './Button';
import { filterType } from '../App';
import styles from './Todolist.module.scss';

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

    const taskItem = tasks.map(task => {
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(task.id, e.currentTarget.checked);
        };

        return (
            <li key={ task.id }>
                <input type="checkbox"
                       checked={ task.isDone }
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