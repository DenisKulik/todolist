import styles from './Todolist.module.scss';
import Checkbox from '../Checkbox/Checkbox';
import Button from '../Button/Button';
import { FilterType, TaskType } from '../../App';
import AddItemForm from '../AddItemForm/AddItemForm';

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

    const addTaskHandler = (title: string) => addTask(title, todolistId);
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
            <AddItemForm addItem={ addTaskHandler } />
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