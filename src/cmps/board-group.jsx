import { TaskList } from "./task-list"

export const BoardGroup = ({ group }) => {

    return <section className="board-group flex column">
        <div>{group.title}</div>
        <TaskList tasks={group.tasks} />
    </section>
}