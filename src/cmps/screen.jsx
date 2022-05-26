import { useNavigate } from 'react-router-dom'


export const Screen = ({ cb }) => {
    const navigate = useNavigate()

    return (
        <div
            className='screen'
            onClick={cb}>
        </div>)
        // <div
        //     className='screen'
        //     onClick={() => {
        //         console.log('koko');
        //         if (!boardId) return
        //         navigate(`/board/${boardId}`)
        //     }}>
        // </div>)
}