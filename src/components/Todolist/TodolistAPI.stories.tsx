import React, { ChangeEvent, useEffect, useState } from 'react';
import { todolistAPI } from '../../api/todolistAPI';

export default {
    title: 'API'
};

export const GetTodolists = () => {
    const [ state, setState ] = useState<any>(null);

    useEffect(() => {
        todolistAPI
            .getTodolists()
            .then((response) => setState(response.data));
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
    const [ state, setState ] = useState<any>(null);
    const [ todolistTitle, setTodolistTitle ] = useState<string>('');

    const onChangeTodolistTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistTitle(e.currentTarget.value);
    };

    const createTodolist = () => {
        todolistAPI
            .createTodolist(todolistTitle)
            .then((response) => setState(response.data));

        setTodolistTitle('');
    };

    return (
        <div>
            <div>
                <input
                    value={todolistTitle}
                    onChange={onChangeTodolistTitleHandler}
                    placeholder="Enter todolist title"
                />
                <button onClick={createTodolist}>Create Todolist</button>
                {state && JSON.stringify(state)}
            </div>
        </div>
    );
};

export const DeleteTodolist = () => {
    const [ state, setState ] = useState<any>(null);
    const [ todolistId, setTodolistId ] = useState<string>('');

    const onChangeTodolistIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value);
    };

    const deleteTodolist = () => {
        todolistAPI
            .deleteTodolist(todolistId)
            .then((response) => setState(response.data));

        setTodolistId('');
    };

    return <div>
        <input
            value={todolistId}
            onChange={onChangeTodolistIdHandler}
            placeholder="Enter todolist ID"
        />
        <button onClick={deleteTodolist}>Delete Todolist</button>
        {state && JSON.stringify(state)}
    </div>;
};

export const UpdateTodolistTitle = () => {
    const [ state, setState ] = useState<any>(null);
    const [ todolistId, setTodolistId ] = useState<string>('');
    const [ todolistTitle, setTodolistTitle ] = useState<string>('');

    const onChangeTodolistIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value);
    };

    const onChangeTodolistTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistTitle(e.currentTarget.value);
    };

    const updateTodolistTitle = () => {
        todolistAPI
            .updateTodolistTitle(todolistId, todolistTitle)
            .then((response) => setState(response.data));

        setTodolistId('');
        setTodolistTitle('');
    };

    return (
        <div>
            <input
                value={todolistId}
                onChange={onChangeTodolistIdHandler}
                placeholder="Enter todolist ID"
            />
            <input
                value={todolistTitle}
                onChange={onChangeTodolistTitleHandler}
                placeholder="Enter new title"
            />
            <button onClick={updateTodolistTitle}>Update Todolist</button>
            {state && JSON.stringify(state)}
        </div>
    );
};

export const GetTasks = () => {
    const [ state, setState ] = useState<any>(null);
    const [ todolistId, setTodolistId ] = useState<string>('');

    const onChangeTodolistIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value);
    };

    const getTasks = () => {
        todolistAPI
            .getTasks(todolistId)
            .then((response) => setState(response.data));

        setTodolistId('');
    };

    return (
        <div>
            <input
                value={todolistId}
                onChange={onChangeTodolistIdHandler}
                placeholder="Enter todolist ID"
            />
            <button onClick={getTasks}>Get Tasks</button>
            {state && JSON.stringify(state)}
        </div>
    );
};

export const CreateTask = () => {
    const [ state, setState ] = useState<any>(null);
    const [ todolistId, setTodolistId ] = useState<string>('');
    const [ taskTitle, setTaskTitle ] = useState<string>('');

    const onChangeTodolistIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value);
    };

    const onChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value);
    };

    const createTask = () => {
        todolistAPI
            .createTask(todolistId, taskTitle)
            .then((response) => setState(response.data));

        setTodolistId('');
        setTaskTitle('');
    };

    return (
        <div>
            <input
                value={todolistId}
                onChange={onChangeTodolistIdHandler}
                placeholder="Enter todolist ID"
            />
            <input
                value={taskTitle}
                onChange={onChangeTaskTitle}
                placeholder="Enter task title"
            />
            <button onClick={createTask}>Create Task</button>
            {state && JSON.stringify(state)}
        </div>
    );
};

export const DeleteTask = () => {
    const [ state, setState ] = useState<any>(null);
    const [ todolistId, setTodolistId ] = useState<string>('');
    const [ taskId, setTaskId ] = useState<string>('');

    const onChangeTodolistIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value);
    };

    const onChangeTaskIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value);
    };

    const deleteTask = () => {
        todolistAPI
            .deleteTask(todolistId, taskId)
            .then((response) => setState(response.data));

        setTodolistId('');
        setTaskId('');
    };

    return (
        <div>
            <input
                value={todolistId}
                onChange={onChangeTodolistIdHandler}
                placeholder="Enter todolist ID"
            />
            <input
                value={taskId}
                onChange={onChangeTaskIdHandler}
                placeholder="Enter task Id"
            />
            <button onClick={deleteTask}>Delete Task</button>
            {state && JSON.stringify(state)}
        </div>
    );
};

export const UpdateTask = () => {
    const [ state, setState ] = useState<any>(null);
    const [ todolistId, setTodolistId ] = useState<string>('');
    const [ taskId, setTaskId ] = useState<string>('');
    const [ taskTitle, setTaskTitle ] = useState<string>('');

    const onChangeTodolistIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value);
    };

    const onChangeTaskIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value);
    };

    const onChangeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value);
    };

    const updateTask = () => {
        todolistAPI
            .updateTask(todolistId, taskId, taskTitle)
            .then((response) => setState(response.data));

        setTodolistId('');
        setTaskId('');
        setTaskTitle('');
    };

    return (
        <div>
            <input
                value={todolistId}
                onChange={onChangeTodolistIdHandler}
                placeholder="Enter todolist ID"
            />
            <input
                value={taskId}
                onChange={onChangeTaskIdHandler}
                placeholder="Enter task Id"
            />
            <input
                value={taskTitle}
                onChange={onChangeTaskTitleHandler}
                placeholder="Enter new title"
            />
            <button onClick={updateTask}>Update Task</button>
            {state && JSON.stringify(state)}
        </div>
    );
};

