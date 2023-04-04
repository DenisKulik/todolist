import { useState } from 'react';

type PropsType = {
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: number) => void
}

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

const Todolist = ({ title, tasks, deleteTask }: PropsType) => {
        const [ filterType, setFilterType ] = useState('all');

        const filterTasks = (valueBtn: string) => setFilterType(valueBtn);

        let filteredTasks = tasks;

        switch (filterType) {
            case 'all':
                filteredTasks = tasks;
                break;
            case 'active':
                filteredTasks = tasks.filter(task => !task.isDone);
                break;
            case 'completed':
                filteredTasks = tasks.filter(task => task.isDone);
                break;
        }

        const taskItem = filteredTasks.map(task => {
            return (
                <li key={ task.id }>
                    <input type="checkbox" checked={ task.isDone } />
                    <span>{ task.title }</span>
                    <button onClick={ () => deleteTask(task.id) }>X</button>
                </li>
            );
        });

        return (
            <div>
                <h3>{ title }</h3>
                <div>
                    <input />
                    <button>+</button>
                </div>
                <ul>
                    { taskItem }
                </ul>
                <div>
                    <button onClick={ () => filterTasks('all') }>
                        All
                    </button>
                    <button onClick={ () => filterTasks('active') }>
                        Active
                    </button>
                    <button onClick={ () => filterTasks('completed') }>
                        Completed
                    </button>
                </div>
            </div>
        );
    }
;

export default Todolist;