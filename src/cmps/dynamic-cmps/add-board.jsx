import Button from '@mui/material/Button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import NewBoardImg from '../../assets/img/add-new-board/new-board.svg'

import { saveBoard } from '../../store/actions/board.action'
import { boardService } from '../../services/board.service'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export const AddBoard = () => {
    const { user } = useSelector((storeState) => storeState.userModule)
    const guest = {
        _id: 'u100',
        fullname: 'Guest',
        username: 'guest',
        imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/guest_he90su.jpg',
    }

    const bgImages = [
        {
            name: 'bgImage1',
            imgUrl: 'https://images.unsplash.com/photo-1621428047980-d773eb8b5f59?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        },
        {
            name: 'bgImage2',
            imgUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1244&q=80',
        },
        {
            name: 'bgImage3',
            imgUrl: 'https://images.unsplash.com/photo-1622723702582-8d810755fa04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        },
        {
            name: 'bgImage4',
            imgUrl: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        },
        {
            name: 'bgImage5',
            imgUrl: 'https://images.unsplash.com/photo-1651869377815-d263cecb6dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        },
    ]

    const bgColors = [
        { name: 'bgColor1', color: '#0079BF' },
        { name: 'bgColor2', color: '#D29034' },
        { name: 'bgColor3', color: '#519839' },
        { name: 'bgColor4', color: '#b04632' },
        { name: 'bgColor5', color: '#89609e' },
    ]

    const defaultBg =
        'https://images.unsplash.com/photo-1455659817273-f96807779a8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'

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
        var board
        if (user) {
            board = await boardService._getEmptyBoard(user)
        } else {
            board = await boardService._getEmptyBoard(guest)
        }
        board.title = title
        board.style.background = selectedBg

        dispatch(saveBoard(board)).then((newBoard) =>
            navigate(`/board/${newBoard._id}`)
        )
    }

    return (
        <div className='new-board-menu flex column'>
            <h1 className='edit-new-board-title'> Create board</h1>
            <div
                className='new-board-img-container'
                style={{
                    backgroundImage: `url(${selectedBg})`,
                    backgroundColor: selectedBg,
                }}
            >
                <img src={NewBoardImg} />
            </div>
            <section>
                <label>Backgrounds</label>
                <div className='new-board-bgs-container flex'>
                    {bgImages.map((bgImage, idx) => (
                        <div
                            key={idx}
                            onClick={() => setSelectedBg(bgImage.imgUrl)}
                            className='prev-bgImage'
                        >
                            <img
                                className={
                                    selectedBg === bgImage.imgUrl
                                        ? 'selected-bg'
                                        : ''
                                }
                                src={bgImage.imgUrl}
                                alt='background'
                            />
                        </div>
                    ))}
                </div>
            </section>
            <div className='new-board-colors-container flex'>
                {bgColors.map((bgColor, idx) => (
                    <div
                        key={idx}
                        className={
                            selectedBg === bgColor.color
                                ? 'selected-bg prev-bgColor'
                                : 'prev-bgColor'
                        }
                        style={{ backgroundColor: bgColor.color }}
                        onClick={() => setSelectedBg(bgColor.color)}
                    ></div>
                ))}
            </div>
            <div className='flex column'>
                <form onSubmit={onHandleSubmit}>
                    <label style={{ display: 'block' }} htmlFor='board-title'>
                        Board title<span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                        id='board-title'
                        onChange={onHandleChange}
                        value={title}
                        autoComplete='off'
                        spellCheck='false'
                        autoFocus
                    />
                </form>
                <h2 style={{ fontSize: '14px', marginTop: '4px' }}>
                    👋Board title is required
                </h2>
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
