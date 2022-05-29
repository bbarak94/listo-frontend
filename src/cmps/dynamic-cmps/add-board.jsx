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

    const bgImages = [
        { name: 'bgImage1', imgUrl: 'https://images.unsplash.com/photo-1605022112646-57c826be7a10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' },
        { name: 'bgImage2', imgUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1244&q=80' },
        { name: 'bgImage3', imgUrl: 'https://images.unsplash.com/photo-1603687669452-b136a84b14b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' },
        { name: 'bgImage4', imgUrl: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' },
        { name: 'bgImage5', imgUrl: 'https://images.unsplash.com/photo-1566411526231-fdbdcf3235c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' }
    ]

    const bgColors = [
        { name: 'bgColor1', color: '#0079BF' },
        { name: 'bgColor2', color: '#D29034' },
        { name: 'bgColor3', color: '#519839' },
        { name: 'bgColor4', color: '#b04632' },
        { name: 'bgColor5', color: '#89609e' }
    ]

    const defaultBg = 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [selectedBg, setSelectedBg] = useState(defaultBg)

    const onHandleChange = ({ target }) => {
        setTitle(target.value)
    }

    const onHandleSubmit = async (ev) => {
        ev.preventDefault()
        if (title === '') return
        const board = boardService.getEmptyBoard()
        board.title = title
        board.style.background = selectedBg

        dispatch(saveBoard(board))
            .then(newBoard => navigate(`/board/${newBoard._id}`))
    }

    return (
        <div className='new-board-menu flex column'>
            <h1 className='edit-new-board-title'> Create board</h1>
            <div className='new-board-img-container' style={{ backgroundImage: `url(${selectedBg})`, backgroundColor: selectedBg }}>
                <img src={NewBoardImg} />
            </div>
            <section>
                <label>Backgrounds</label>
                <div className='new-board-bgs-container flex'>
                    {bgImages.map((bgImage, idx) =>
                        <div key={idx} onClick={() => setSelectedBg(bgImage.imgUrl)} className='prev-bgImage'>
                            <img
                                className={selectedBg === bgImage.imgUrl ? 'selected-bg' : ''}
                                src={bgImage.imgUrl}
                                alt='background'
                            />
                        </div>
                    )}


                    {/* <div id='bg1' onClick={onHandleClick} className='prev-bg prev-bg1'>
                        <img
                            className='bg1'
                            src={bg1}
                            alt='background'
                            style={{ width: '64px', height: '40px' }}
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
                    </div> */}

                </div>
            </section>
            <div className='new-board-colors-container flex'>
                {bgColors.map((bgColor, idx) =>
                    <div
                        key={idx}
                        className={selectedBg === bgColor.color ? 'selected-bg prev-bgColor' : 'prev-bgColor'}
                        style={{ backgroundColor: bgColor.color }}
                        onClick={() => setSelectedBg(bgColor.color)}
                    >
                    </div>
                )}
                {/* <div className='prev-bgColor prev-bgc1'></div>
                <div className='prev-bgColor prev-bgc2'></div>
                <div className='prev-bgColor prev-bgc3'></div>
                <div className='prev-bgColor prev-bgc4'></div>
                <div className='prev-bgColor prev-bgc5'></div> */}
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
