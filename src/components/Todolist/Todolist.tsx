import { ChangeEvent, KeyboardEvent, useState } from 'react';
import styles from './Todolist.module.scss';
import Checkbox from '../Checkbox/Checkbox';
import Button from '../Button/Button';
import { FilterType, TaskType } from '../../App';

type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    filter: FilterType
    addTask: (title: string, todolistId: string) => void
    deleteTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, value: boolean,
                       todolistId: string) => void
    changeTodolistFilter: (value: FilterType, todolistId: string) => void
    deleteTodolist: (todolistId: string) => void
}

const Todolist = (props: TodolistPropsType) => {
    const {
        todolistId,
        title,
        tasks,
        filter,
        addTask,
        deleteTask,
        deleteTodolist,
        changeTodolistFilter,
        changeTaskStatus
    } = props;

    const [ value, setValue ] = useState<string>('');
    const [ error, setError ] = useState<string | null>(null);

    const AddTaskHandler = () => {
        if (value.trim() === '') {
            setError('Field is required');
            return;
        }

        addTask(value, todolistId);
        setValue('');
    };
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setValue(e.currentTarget.value);
    };
    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        return e.key === 'Enter' && AddTaskHandler();
    };
    const deleteTaskHandler = (id: string) => deleteTask(id, todolistId);
    const deleteTodolistHandler = () => deleteTodolist(todolistId);
    const changeTaskStatusHandler = (status: boolean, id: string) => {
        changeTaskStatus(id, status, todolistId);
    };

    const taskItems: JSX.Element[] = tasks.map(task => {
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
            <header className={ styles.todolistHeader }>
                <h3>{ title }</h3>
                <Button name={ 'X' } callback={ deleteTodolistHandler } />
            </header>
            <div>
                <input className={ error ? styles.error : '' }
                       onChange={ onChangeInputHandler }
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
                { taskItems }
            </ul>
            <div>
                <Button name={ 'all' } filter={ filter }
                        callback={ () => changeTodolistFilter('all',
                            todolistId) } />
                <Button name={ 'active' } filter={ filter }
                        callback={ () => changeTodolistFilter('active',
                            todolistId) } />
                <Button name={ 'completed' } filter={ filter }
                        callback={ () => changeTodolistFilter('completed',
                            todolistId) } />
            </div>
        </div>
    );
};

export default Todolist;