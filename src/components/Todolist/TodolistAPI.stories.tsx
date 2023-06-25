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

