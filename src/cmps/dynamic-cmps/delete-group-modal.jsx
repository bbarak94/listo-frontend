import { useDispatch } from "react-redux"
import { removeGroupFromBoard } from "../../store/actions/board.action"

export const DeleteGroupModal = ({ board, group }) => {
    const dispatch = useDispatch()

    const onRemoveGroupFromBoard = () => {
        dispatch(removeGroupFromBoard(board, group.id))
    }

    return (<>
        {<div className="label">
            <h1>List actions</h1>
            <hr />

            <div className="view-workspace-btn" onClick={onRemoveGroupFromBoard}>
                Remove this list
            </div>
        </div>}
    </>)
}