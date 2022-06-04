
import { boardService } from "../../services/board.service"

export const Members = ({board, task, onOpenModal }) => {

    return (
        <>
            {task.memberIds?.length > 0 && <div className='members-list-container flex column'>
                <div className='members-avatars-container-task-preview flex'>
                    {boardService.getMembersByIds(task.memberIds, board)?.map((member) => {
                        return (
                            <div title={member.fullname} key={member.id} className='member-container flex'
                                onClick={(ev) => {
                                    ev.preventDefault()
                                    onOpenModal(ev, 'member', member)
                                }} >
                                <img src={member.imgUrl} />
                            </div>)
                    })}
                </div>
            </div>}
        </>
    )
}