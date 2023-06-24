import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default {
    title: 'API'
};

const settings = {
    withCredentials: true
};

export const GetTodolists = () => {
    const [ state, setState ] = useState<any>(null);

    useEffect(() => {
        const promise = axios.get(
            'https://social-network.samuraijs.com/api/1.1/todo-lists',
            settings
        ).then((response) => setState(response.data));
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
    const [ state, setState ] = useState<any>(null);

    useEffect(() => {
        const promise = axios.post(
            'https://social-network.samuraijs.com/api/1.1/todo-lists',
            { title: 'What to learn' },
            settings
        ).then((response) => setState(response.data));
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
    const [ state, setState ] = useState<any>(null);

    useEffect(() => {
        const todolistId = 'some-todolist-id'; // paste correct id

        const promise = axios
            .delete(
                `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
                settings
            )
            .then((response) => setState(response.data));
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodolistTitle = () => {
    const [ state, setState ] = useState<any>(null);
    useEffect(() => {
        const todolistId = 'some-todolist-id'; // paste correct id

        const promise = axios
            .put(
                `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
                { title: 'What to buy' },
                settings
            )
            .then((response) => setState(response.data));

    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

