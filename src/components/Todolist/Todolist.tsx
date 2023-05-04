import styles from './Todolist.module.scss';
import Checkbox from '../Checkbox/Checkbox';
import Button from '../Button/Button';
import { FilterType, TaskType } from '../../App';
import AddItemForm from '../AddItemForm/AddItemForm';
import EditableSpan from '../EditableSpan/EditableSpan';

type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    filter: FilterType
    addTask: (title: string, todolistId: string) => void
    deleteTask: (taskId: string, todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, value: boolean,
                       todolistId: string) => void
    changeTodolistFilter: (value: FilterType, todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
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
            changeTaskTitle,
            changeTaskStatus,
            deleteTodolist,
            changeTodolistTitle,
            changeTodolistFilter,
        } = props;

        const addTaskHandler = (title: string) => addTask(title, todolistId);
        const deleteTaskHandler = (id: string) => deleteTask(id, todolistId);
        const deleteTodolistHandler = () => deleteTodolist(todolistId);
        const changeTodolistTitleHandler = (title: string) => {
            changeTodolistTitle(title, todolistId);
        };
        const changeTaskStatusHandler = (status: boolean, id: string) => {
            changeTaskStatus(id, status, todolistId);
        };
        const changeTaskTitleHandler = (title: string, id: string) => {
            changeTaskTitle(id, title, todolistId);
        };

        const tasksItems: JSX.Element[] = tasks.map(task => {
            return (
                <li className={task.isDone ? styles.isDone : ''} key={task.id}>
                    <Checkbox
                        isDone={task.isDone}
                        callback={(changedIsDone) => changeTaskStatusHandler(
                            changedIsDone, task.id)}
                    />
                    <EditableSpan
                        title={task.title}
                        callback={(title) => changeTaskTitleHandler(title, task.id)}
                    />
                    <Button name="X" callback={() => deleteTaskHandler(task.id)} />
                </li>
            );
        });

        return (
            <div>
                <header className={styles.todolistHeader}>
                    <h3>
                        <EditableSpan
                            title={title}
                            callback={changeTodolistTitleHandler}
                        />
                    </h3>
                    <Button name="X" callback={deleteTodolistHandler} />
                </header>
                <AddItemForm addItem={addTaskHandler} />
                <ul>{tasksItems}</ul>
                <div>
                    <Button
                        name="all"
                        filter={filter}
                        callback={() => changeTodolistFilter('all', todolistId)}
                    />
                    <Button
                        name="active"
                        filter={filter}
                        callback={() => changeTodolistFilter('active', todolistId)}
                    />
                    <Button
                        name="completed"
                        filter={filter}
                        callback={() => changeTodolistFilter('completed',
                            todolistId)}
                    />
                </div>
            </div>
        );
    }
;

export default Todolist;