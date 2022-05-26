
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const TaskLabels = () => {
    const { taskId } = useParams()
    const { board } = useSelector((storeState) => storeState.boardModule)
// i have labels [id,id]
    return (
        <>
            <h1>labels</h1>
            <hr />
            
            <button> create new label</button>
        </>
    )
}