import { useNavigate } from 'react-router-dom'


export const Screen = ({ boardId }) => {
    const navigate = useNavigate()

    return (
        <div
            className='screen'
            onClick={() => {
                navigate(`/board/${boardId}`)
            }}>
        </div>)
}