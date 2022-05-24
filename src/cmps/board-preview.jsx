import { useState, useEffect } from 'react'

export const BoardPreview = ({ board }) => {
   //  const [board, setBoard] = useState(board)

    const getStyle = () => {
        return board.style
    }

    return (
        <section className='board-preview' style={getStyle()}>
            <p> {board.title}</p>
        </section>
    )
}
