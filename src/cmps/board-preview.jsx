import { useState, useEffect } from 'react'

export const BoardPreview = ({ board }) => {

    const getStyle = () => {
        return board.style
    }

    return (
        <div className='board-preview flex ' style={getStyle()}>
            <div>{board.title}</div>
        </div>
    )
}
