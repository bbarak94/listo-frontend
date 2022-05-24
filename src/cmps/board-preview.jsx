import { useState, useEffect } from 'react'

export const BoardPreview = ({ board }) => {
    console.log('board.style:',board.style)
    
    return (
        <div
            className='board-preview flex column'
            style={board.style || { backgroundColor: '#000000' }}
        >
            <div>
                <h3>Template</h3>
            </div>
            <div>
                <h2>{board.title}</h2>
            </div>
        </div>
    )
}
