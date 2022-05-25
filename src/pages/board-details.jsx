import { useEffect, useState } from "react"
import { useParams, Outlet } from "react-router-dom"
import { BoardGroup } from "../cmps/board-group"
import { setBoard } from '../store/actions/board.action'
import { AddGroup } from '../cmps/add-group'
import { useDispatch, useSelector } from "react-redux"
import { boardService } from "../services/board.service"

export const BoardDetails = () => {
    const [expandShownGroupId, setExpandShownId] = useState('')
    const params = useParams()
    const { board } = useSelector((storeState) => storeState.boardModule)
    const dispatch = useDispatch()

    useEffect(() => {
        loadBoard()
    }, [params.id])

    const loadBoard = async () => {
        const board = await boardService.getById(params.boardId)
        dispatch(setBoard(board))
    }

    if (!board) return <div>Loading...</div>
    console.log('board:',board)
    
    return (

        <main className="board-details flex">
            {board.groups.map(group =>
                <BoardGroup
                    group={group}
                    key={group.id}
                    boardId={board._id}
                    setExpandShownId={setExpandShownId}
                    expandShownGroupId={expandShownGroupId}
                />
            )}
            <AddGroup />
            <Outlet />
        </main>
       
    )
}
