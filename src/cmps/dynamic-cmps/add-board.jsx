import Button from '@mui/material/Button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import NewBoardImg from '../../assets/img/add-new-board/new-board.svg'
import more from '../../assets/img/workspace/more.svg'
// import { ColorTextFields } from '../color-text-fields'
import bg1 from '../../assets/img/backgrounds/1.jpg'
import bg2 from '../../assets/img/backgrounds/2.jpg'
import bg3 from '../../assets/img/backgrounds/3.jpg'
import bg4 from '../../assets/img/backgrounds/4.jpg'

import { saveBoard } from '../../store/actions/board.action'
import { boardService } from '../../services/board.service'
import { useState } from 'react'


export const AddBoard = ({ handleClose }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [isActive, setActive] = useState()

    const onHandleChange = ({ target }) => {
        setTitle(target.value)
    }

    const onHandleSubmit = (ev) => {
        ev.preventDefault()
        if (title === '') return
        const board = boardService.getEmptyBoard()
        board.title = title
        dispatch(saveBoard(board))
        handleClose()
    }

    const onHandleClick = ({target}) => {
        const imgs =  target.closest('div').closest('div').children
        console.log('imgs', imgs)
        imgs.forEach(img=> img.classList.remove('selected'))
        target.classList.add('selected')
        
    }

    return (
        <div className='new-board-menu flex column'>
            <h1 className='edit-new-board-title'> Create board</h1>
            <div className='new-board-img-container'>
                <img src={NewBoardImg} style={{ background: bg1 }} />
            </div>
            <section>
                <label>Backgrounds</label>
                <div className='new-board-bgs-container flex'>
                    <div id='bg1' onClick={onHandleClick} className='prev-bg prev-bg1'>
                        <img
                            className='bg1'
                            src={bg1}
                            alt='background'
                            style={{ width: '64px', height: '40px', margin: 0 }}
                        />
                    </div>
                    <div id='bg2' onClick={onHandleClick} className='prev-bg prev-bg2'>
                        <img
                            className='bg2'
                            src={bg2}
                            alt='background'
                            style={{ width: '64px', height: '40px' }}
                        />
                    </div>
                    <div onClick={onHandleClick} className='prev-bg prev-bg3'>
                        <img
                            className='bg3'
                            src={bg3}
                            alt='background'
                            style={{ width: '64px', height: '40px' }}
                        />
                    </div>
                    <div onClick={onHandleClick} className='prev-bg prev-bg4'>
                        <img
                            className='bg4'
                            src={bg4}
                            alt='background'
                            style={{ width: '64px', height: '40px' }}
                        />
                    </div>
                </div>
            </section>
            <div className='new-board-colors-container flex'>
                <div className='prev-bgc prev-bgc1'></div>
                <div className='prev-bgc prev-bgc2'></div>
                <div className='prev-bgc prev-bgc3'></div>
                <div className='prev-bgc prev-bgc4'></div>
                <div className='prev-bgc prev-bgc5'></div>
                {/* <div className='prev-bgc prev-bgc-more flex'>
                    <img src={more} alt='more' style={{ width: '25px' }} />
                </div> */}
            </div>

            {/* <ColorTextFields /> */}
            <div className='flex column'>
                <form onSubmit={onHandleSubmit}>
                    <label style={{ display: 'block' }} htmlFor='board-title'>Board title<span style={{ color: 'red' }}>*</span></label>
                    <input
                        id='board-title'
                        onChange={onHandleChange}
                        value={title}
                        autoComplete='off'
                        spellCheck='false'
                        autoFocus
                    />
                </form>
                <h2 style={{ fontSize: '14px', marginTop: '4px' }}>👋Board title is required</h2>
            </div>
            <Button
                className='create-board-btn'
                onClick={onHandleSubmit}
                variant='contained'
                size='medium'
            >
                Create
            </Button>
        </div>
    )
}
