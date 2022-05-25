import { useEffect, useState } from "react"
import { useParams, Outlet } from "react-router-dom"
import { BoardGroup } from "../cmps/board-group"
import { boardService } from '../services/board.service'
import { AddGroup } from '../cmps/add-group'

export const BoardDetails = () => {
    const params = useParams()

    const [board, setboard] = useState(null)

    useEffect(() => {
        loadBoard()
    }, [params.id])

    const loadBoard = async () => {
        const board = await boardService.getById(params.boardId)
        setboard(board)
    }

    if (!board) return <div>Loading...</div>

    return (
        <main className="board-details flex">
            {board.groups.map(group =>
                <BoardGroup group={group} key={group.id} groupId={group.id} boardId={board._id} />
            )}
            <AddGroup/>
            <Outlet />
        </main>
    )
}
