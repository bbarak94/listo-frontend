import { TaskList } from "./task-list"
import { AddTask } from "./add-task"
import { GroupTitleEdit } from "./group-title-edit"
import { useEffect } from "react"
import { useDispatch } from 'react-redux'
import { updateGroup } from '../store/actions/board.action'

export const BoardGroup = ({ group, board, expandCardTitleGroupId, setExpandCardTitleId, setTaskEditExpand,onOpenModal }) => {
 

    return <article className="board-group flex column">
        
        
        <GroupTitleEdit
            groupTitle={group.title}
            group={group}
            boardId={board._id}
        />

        <TaskList
        onOpenModal={onOpenModal}
            board={board}
            group={group}
            setTaskEditExpand={setTaskEditExpand}
        />
        <AddTask
            setExpandCardTitleId={setExpandCardTitleId}
            expandCardTitleGroupId={expandCardTitleGroupId}
            groupId={group.id}
            boardId={board._id}
        />
   
    </article>
}





// import { TaskList } from "./task-list"
// import { AddTask } from "./add-task"
// import { GroupTitleEdit } from "./group-title-edit"

// export const BoardGroup = ({ group, board, expandCardTitleGroupId, setExpandCardTitleId, setTaskEditExpand }) => {

//     return <article className="board-group flex column">
//         <GroupTitleEdit
//             groupTitle={group.title}
//             group={group}
//             boardId={board._id}
//         />
//         <TaskList
//             board={board}
//             group={group}
//             setTaskEditExpand={setTaskEditExpand}
//         />
//         <AddTask
//             setExpandCardTitleId={setExpandCardTitleId}
//             expandCardTitleGroupId={expandCardTitleGroupId}
//             groupId={group.id}
//             boardId={board._id}
//         />
//     </article>
// }