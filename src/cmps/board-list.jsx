import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadBoards,saveBoard } from '../store/actions/board.action'
import { BoardPreview } from './board-preview'
import { boardService } from '../services/board.service'
import { AddNewBoard } from './add-new-board'

export const BoardList = (props) => {
    const { boards } = useSelector((storeState) => storeState.boardModule)
    const dispatch = useDispatch()

    const onCreateNewBoard = () => {
        const board = boardService.getEmptyBoard()
        console.log('board:', board)
        dispatch(saveBoard(board))
    }

    useEffect(() => {
        dispatch(loadBoards())
    }, [])

    if (!boards) return <h1>loading...</h1>
    return (
        <div className='board-list flex'>
            {boards.map((board) => (
                <BoardPreview board={board} key={board._id} />
            ))}
            {/* <div
                className='board-preview flex column align-center justify-center'
                style={{ backgroundColor: '#091e420a' }}
                onClick={() => {
                    console.log('new board created')
                    onCreateNewBoard()
                }}
            >
                <div>
                    <h2
                        style={{
                            color: '#172b4d',
                            margin: 'auto',
                            fontSize: '14px',
                        }}
                    >
                        create new board
                    </h2>
                </div>
            </div> */}
            <AddNewBoard onCreateNewBoard={onCreateNewBoard}/>
        </div>
    )
}
