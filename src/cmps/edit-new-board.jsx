
import NewBoardImg from '../assets/img/add-new-board/new-board.svg'
import {ColorTextFields} from './color-text-fields.jsx'
import Button from '@mui/material/Button'



export function EditNewBoard({onCreateNewBoard}) {
    return (
        <div className='new-board-menu flex column'>
        <h2> Create board</h2>
            <div className='new-board-img-container'>
                <img src={NewBoardImg} />
            </div>
            <ColorTextFields />
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
