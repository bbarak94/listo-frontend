import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const BoardPreview = ({ board }) => {
    // console.log('board.style:', board.style)
    const navigation = useNavigate()
    return (
        <div
            className='board-preview flex column'
            style={board.style || { backgroundColor: '#000000' }}
            onClick={() => {
                navigation(`/board/${board._id}`)
            }}
        >
            {/* <Link to={`/board/${board._id}`}> */}
            <div>
                <h3>Template</h3>
            </div>
            <div>
                <h2>{board.title}</h2>
            </div>
            {/* </Link> */}
        </div>
    )
}
