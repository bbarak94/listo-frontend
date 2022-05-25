import { useEffect, useState } from "react"
import { useParams, Outlet } from "react-router-dom"
import { BoardGroup } from "../cmps/board-group"
import { boardService } from '../services/board.service'

export const BoardDetails = () => {
    const params = useParams()

    const [board, setboard] = useState(null)
    const [isTaskOpen, setTaskOpen] = useState(false)
    useEffect(() => {
        loadBoard()
    }, [params.id])

    const loadBoard = async () => {
        const board = await boardService.getById(params.boardId)
        setboard(board)
    }

    if (!board) return <div>Loading...</div>

    return (
        <div className="board-details flex">
            {board.groups.map(group =>
                <BoardGroup group={group} key={group.id} boardId={board._id} setTaskOpen={setTaskOpen}/>
            )}
            {isTaskOpen && <Outlet/>}
        </div>
    )
}
