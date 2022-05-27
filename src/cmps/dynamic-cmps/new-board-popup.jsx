import NewBoardImg from '../../assets/img/add-new-board/new-board.svg'
import { ColorTextFields } from '../color-text-fields'
import { boardService } from '../../services/board.service'
import Button from '@mui/material/Button'
import { useDispatch } from 'react-redux'
import more from '../../assets/img/workspace/more.svg'
import bg1 from '../../assets/img/backgrounds/1.jpg'
import bg2 from '../../assets/img/backgrounds/2.jpg'
import bg3 from '../../assets/img/backgrounds/3.jpg'
import bg4 from '../../assets/img/backgrounds/4.jpg'
import { saveBoard } from '../../store/actions/board.action'
import { useNavigate } from 'react-router-dom'

export const NewBoardPopup = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onCreateNewBoard = async () => {
        const board = boardService.getEmptyBoard()
        // boardService.save(board)
        // console.log('board:',board)
        dispatch(saveBoard(board))
        // navigate(`/board/${board.id}`)
    }

    return (
        <div className='new-board-menu flex column'>
            <h1 className='edit-new-board-title'> Create board</h1>
            <div className='new-board-img-container'>
                <img src={NewBoardImg} style={{background: bg1}} />
            </div>
            <label>Backgrounds</label>
            <div className='new-board-bgs-container flex'>
                <div className='prev-bg prev-bg1'>
                    <img
                        className='bg1'
                        src={bg1}
                        alt='background'
                        style={{ width: '64px', height: '40px', margin: 0 }}
                    />
                </div>
                <div className='prev-bg prev-bg2'>
                    <img
                        className='bg2'
                        src={bg2}
                        alt='background'
                        style={{ width: '64px', height: '40px' }}
                    />
                </div>
                <div className='prev-bg prev-bg3'>
                    <img
                        className='bg3'
                        src={bg3}
                        alt='background'
                        style={{ width: '64px', height: '40px' }}
                    />
                </div>
                <div className='prev-bg prev-bg4'>
                    <img
                        className='bg4'
                        src={bg4}
                        alt='background'
                        style={{ width: '64px', height: '40px' }}
                    />
                </div>
            </div>
            <div className='new-board-colors-container flex'>
                <div className='prev-bgc prev-bgc1'></div>
                <div className='prev-bgc prev-bgc2'></div>
                <div className='prev-bgc prev-bgc3'></div>
                <div className='prev-bgc prev-bgc4'></div>
                <div className='prev-bgc prev-bgc5'></div>
                <div className='prev-bgc prev-bgc-more flex'>
                    <img src={more} alt='more' style={{ width: '25px' }} />
                </div>
            </div>

            <ColorTextFields />
            <h2 style={{ fontSize: '14px' }}>👋Board title is required</h2>
            <Button
                className='create-board-btn'
                onClick={() => {
                    onCreateNewBoard()
                }}
                variant='contained'
                size='medium'
            >
                Create
            </Button>
        </div>
    )
}
