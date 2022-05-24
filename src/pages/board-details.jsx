import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BoardGroup } from "../cmps/board-group"
import { boardService } from '../services/board.service'

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
    console.log(board.style.background);
    return (
        <div className="board-details flex" style={{backgroundColor: board.style.background}}>
            {board.groups.map(group =>
                <BoardGroup group={group} key={group.id} />
            )}
        </div>
    )
}
