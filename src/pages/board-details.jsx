import { useEffect, useState } from "react"
import { useParams, Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { setBoard } from '../store/actions/board.action'

import { BoardGroup } from "../cmps/board-group"
import { AddGroup } from '../cmps/add-group'

export const BoardDetails = () => {
    const [expandCardTitleGroupId, setExpandCardTitleId] = useState('')

    const params = useParams()
    const { board } = useSelector((storeState) => storeState.boardModule)
    const dispatch = useDispatch()

    useEffect(() => {
        loadBoard()
    }, [params.boardId])

    const loadBoard = async () => {
        dispatch(setBoard(params.boardId))
    }

    if (!board) return <div>Loading...</div>
    
    return (

        <main className="board-details flex">
            {board.groups.map(group =>
                <BoardGroup
                    group={group}
                    key={group.id}
                    board={board}
                    expandCardTitleGroupId={expandCardTitleGroupId}
                    setExpandCardTitleId={setExpandCardTitleId}
                />
            )}
            <AddGroup />
            <Outlet />
        </main>

    )
}
