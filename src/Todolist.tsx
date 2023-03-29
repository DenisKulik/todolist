type PropsType = {
    title: string
    tasks: TaskType[]
}

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

const Todolist = ({ title, tasks }: PropsType) => {
    const taskItem = tasks.map((task) => (
        <li key={task.id}>
            <input type="checkbox" checked={task.isDone} />
            <span>{task.title}</span>
        </li>
    ));

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input />
                <button>+</button>
            </div>
            <ul>
                {taskItem}
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