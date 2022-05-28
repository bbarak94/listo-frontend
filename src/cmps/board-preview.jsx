import { useNavigate } from 'react-router-dom'

export const BoardPreview = ({ board }) => {

    const navigation = useNavigate()

    return (
        <div
            className='board-preview flex column'
            style={{
                backgroundImage: `url(${board.style.background})`,
                backgroundColor: board.style.background,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            onClick={() => {
                navigation(`/board/${board._id}`)
            }}
        >
            {/* <div>
                <h3>Template</h3>
            </div> */}
            <div>
                <h2>{board.title}</h2>
            </div>
        </div>
    )
}
