import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { boardService } from '../services/board.service'

export const BoardDetails = () => {
    const params = useParams()

    const [board, setboard] = useState(null)

    useEffect(() => {
        loadBoard()
    }, [params.id])

    const loadBoard = async () => {
        const board = await boardService.getById(params.id)
        setboard(board)
    }

    if (!board) return <div>Loading...</div>

    return (
        <h1>I'm Board Details</h1>
    )
}
