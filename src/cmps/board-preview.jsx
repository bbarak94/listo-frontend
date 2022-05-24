import { useState, useEffect } from 'react'

export const BoardPreview = ({ board }) => {

    const getStyle = () => {
        return board.style
    }

    return (
        <section className='board-preview' style={getStyle()}>
            <p>
                board preview--
                {board.title}
            </p>
        </section>
    )
}
