import React, { useEffect, useState } from 'react';
import { todolistAPI } from '../../api/todolistAPI';

export default {
    title: 'API'
};

export const GetTodolists = () => {
    const [ state, setState ] = useState<any>(null);

    useEffect(() => {
        todolistAPI
            .getTodolist()
            .then((response) => setState(response.data));
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
    const [ state, setState ] = useState<any>(null);

    useEffect(() => {
        todolistAPI
            .createTodolist('What to learn')
            .then((response) => setState(response.data));
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
    const [ state, setState ] = useState<any>(null);

    useEffect(() => {
        const todolistId = 'some-todolist-id'; // paste correct id

        todolistAPI
            .deleteTodolist(todolistId)
            .then((response) => setState(response.data));
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodolistTitle = () => {
    const [ state, setState ] = useState<any>(null);
    useEffect(() => {
        const todolistId = 'some-todolist-id'; // paste correct id

        todolistAPI
            .updateTodolistTitle(todolistId, 'What to buy')
            .then((response) => setState(response.data));

    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

export const GetTasks = () => {
    const [ state, setState ] = useState<any>(null);
    const todolistId = 'some-todolist-id'; // paste correct id

    useEffect(() => {
        todolistAPI
            .getTasks(todolistId)
            .then((response) => setState(response.data));
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

export const CreateTask = () => {
    const [ state, setState ] = useState<any>(null);
    const todolistId = 'some-todolist-id'; // paste correct id

    useEffect(() => {
        todolistAPI
            .createTask(todolistId, 'React')
            .then((response) => setState(response.data));
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTask = () => {
    const [ state, setState ] = useState<any>(null);

    useEffect(() => {
        const todolistId = 'some-todolist-id'; // paste correct id
        const taskId = 'some-task-id'; // paste correct id

        todolistAPI
            .deleteTask(todolistId, taskId)
            .then((response) => setState(response.data));
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTask = () => {
    const [ state, setState ] = useState<any>(null);

    useEffect(() => {
        const todolistId = 'some-todolist-id'; // paste correct id
        const taskId = 'some-task-id'; // paste correct id

        todolistAPI
            .updateTask(todolistId, taskId, 'Redux')
            .then((response) => setState(response.data));

    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

