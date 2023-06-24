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
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodolistTitle = () => {
    const [ state, setState ] = useState<any>(null);
    useEffect(() => {
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

