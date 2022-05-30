import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { saveBoard } from "../../store/actions/board.action"
import Button from '@mui/material/Button'
import { boardService } from "../../services/board.service"
import { labelService } from "../../services/label.service"
import { useForm } from "../../hooks/useForm"

export const EditLabel = ({ board }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    // useForm({

    // },onCreatLabel)

    // const [title, setTitle] = useState('')


    // const onHandleChange = ({ target }) => {
    //     setTitle(target.value)
    // }

    // const onHandleSubmit = async (ev) => {
    //     ev.preventDefault()
    //     if (title === '') return
    //     const board = boardService.getEmptyBoard()
    //     board.title = title
    //     board.style.background = selectedBg

    //     dispatch(saveBoard(board))
    //         .then(newBoard => navigate(`/board/${newBoard._id}`))
    // }

    return (<div className="edit-label">

        <h1>Creat labels</h1>
        <hr />

        <label htmlFor="">Name</label>
        <input type="text" autoFocus />

        <label htmlFor="">Select a color</label>
        <div className="edit-label-color-container flex">
            { labelService.getBasicColors().map((clr, idx) => {
                return <div key={idx} className="adit-label-color" style={{ background: clr }}></div>
            })}
        </div>
        <div className="no-color-label-container flex">
            <div className="no-color-label" style={{ background: '#B3BAC5' }}></div>
            <div className="no-color-desc">
                <p>No color.</p>
                <p>This won't show up on the front of cards.</p>
            </div>
        </div>

        <div className="edit-label-btn-container flex">
            <button className="create-label-btn"  >Create</button>

        </div>

    </div>)

    {/* <form onSubmit={onHandleSubmit}>
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
        <Button
            className='create-board-btn'
            onClick={onHandleSubmit}
            variant='contained'
            size='medium'
        >
            Create
        </Button> */}
    // )




    {/* {<div className="label-edit">
                <p>Create label</p>
                <hr />
                <input type="text" />
                <div className='cover-colors'>
                    {colors.map((color, idx) =>
                        <button key={idx} style={{ backgroundColor: color }}></button>
                    )}
                </div>
                <button> create new label</button>
            </div>} */}


}