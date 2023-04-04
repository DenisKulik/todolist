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
    const taskItem = tasks.map(task => {
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
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};

export default Todolist;