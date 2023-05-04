import { useState } from 'react';
import { v1 } from 'uuid';
import './App.scss';
import Todolist from './components/Todolist/Todolist';

export type FilterType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type TasksStateType = {
    [todolistId: string]: TaskType[]
}

export type TaskType = {
    id: string
    title: string,
    isDone: boolean
}

const App = () => {
    const todolistId_1 = v1();
    const todolistId_2 = v1();
    const [ todolists, setTodolists ] = useState<TodolistType[]>([
        { id: todolistId_1, title: 'What to learn', filter: 'all' },
        { id: todolistId_2, title: 'What to buy', filter: 'all' },
    ]);
    const [ tasks, setTask ] = useState<TasksStateType>({
        [todolistId_1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
            { id: v1(), title: 'Rest API', isDone: false },
            { id: v1(), title: 'GraphQL', isDone: false },
        ],
        [todolistId_2]: [
            { id: v1(), title: 'Milk', isDone: true },
            { id: v1(), title: 'Bread', isDone: true },
            { id: v1(), title: 'Butter', isDone: false },
            { id: v1(), title: 'Meat', isDone: false },
            { id: v1(), title: 'Snacks', isDone: false },
        ]
    });

    const addTask = (title: string, todolistId: string) => {
        const newTask: TaskType = { id: v1(), title, isDone: false };
        const updTasks = [ newTask, ...tasks[todolistId] ];
        setTask({ ...tasks, [todolistId]: updTasks });
    };

    const deleteTask = (taskId: string, todolistId: string): void => {
        const updTasks = tasks[todolistId].filter(task => task.id !== taskId);
        setTask({ ...tasks, [todolistId]: updTasks });
    };

    const changeTaskStatus = (taskId: string, value: boolean,
                              todolistId: string) => {
        const updTasks = tasks[todolistId].map(
            task => task.id === taskId ? { ...task, isDone: value } : task);
        setTask({ ...tasks, [todolistId]: updTasks });
    };

    const changeTaskTitle = () => {};

    const changeTodolistFilter = (value: FilterType, todolistId: string) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ?
            { ...todolist, filter: value } : todolist));
    };

    const addTodolist = () => {};

    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId));
        delete tasks[todolistId];
    };

    const changeTodolistTitle = () => {};

    const getFilteredTasks = (tasks: TaskType[],
                              filter: FilterType): TaskType[] => {
        switch (filter) {
            case 'active':
                return tasks.filter(task => !task.isDone);
            case 'completed':
                return tasks.filter(task => task.isDone);
            default:
                return tasks;
        }
    };

    const todolistItems: JSX.Element[] = todolists.map(todolist => {
        const tasksForTodolist = getFilteredTasks(tasks[todolist.id],
            todolist.filter);

        return (
            <Todolist
                key={ todolist.id }
                todolistId={ todolist.id }
                title={ todolist.title }
                tasks={ tasksForTodolist }
                filter={ todolist.filter }
                addTask={ addTask }
                deleteTask={ deleteTask }
                deleteTodolist={ deleteTodolist }
                changeTodolistFilter={ changeTodolistFilter }
                changeTaskStatus={ changeTaskStatus }
            />
        );
    });

    return (
        <div className="App">{ todolistItems }</div>
    );
};

export default App;