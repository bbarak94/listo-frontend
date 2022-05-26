import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

import { useEffectUpdate } from '../../hooks/useEffectUpdate'

import FolderIcon from '@mui/icons-material/Folder'
import FolderCopyIcon from '@mui/icons-material/FolderCopy'

import { setCoverColor, setCoverImg } from '../../store/actions/app.action'
import { updateTask } from '../../store/actions/board.action'

import { boardService } from '../../services/board.service'
import { style } from '@mui/system'

export const Cover = () => {
    const dispatch = useDispatch()
    const { boardId, taskId } = useParams()
    const [task, setTask] = useState(null)
    const [group, setGroup] = useState(null)
    const { board } = useSelector((storeState) => storeState.boardModule)

    useEffectUpdate(() => {
        const { currTask, currGroup } = boardService.getTaskAndGroup(board, taskId)
        setTask(currTask)
        setGroup(currGroup)
    }, [board])

    const colors = [
        '#7BC86C',
        '#F5DD29',
        '#FFAF3F',
        '#EF7564',
        '#CD8DE5',
        '#5BA4CF',
        '#29CCE5',
        '#6DECA9',
        '#FF8ED4',
        '#172B4D'
    ]

    const imgUrls = [
        'https://images.unsplash.com/photo-1631116616602-322db356c4fb?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687',
        'https://images.unsplash.com/photo-1497276236755-0f85ba99a126?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687',
        'https://images.unsplash.com/photo-1651438416370-39729e9d43af?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074',
        'https://images.unsplash.com/photo-1653216977231-bd0a1ec414f6?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170',
        'https://images.unsplash.com/photo-1631624729083-c64035648cfb?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687',
        'https://images.unsplash.com/photo-1644797694478-d12d4eab8cd8?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880'
    ]

    const onSetCoverColor = (color) => {
        const taskToUpdate = { ...task, style: { ...style, color, imgUrl: null } }
        dispatch(updateTask(taskToUpdate, board._id, group.id))
    }

    const onSetCoverImg = (imgUrl) => {
        const taskToUpdate = { ...task, style: { ...style, color: null, imgUrl } }
        dispatch(updateTask(taskToUpdate, board._id, group.id))
    }

    return (
        <div className="cover">
            <div className="popup-header flex align-center justify-center">
                Cover
                <span className='close-btn' style={{ position: 'absolute', right: 0 }}></span>
            </div>
            <div>
                <h4>Size</h4>
                <div className='flex justify-center'>
                    <FolderIcon fontSize='large' />
                    <FolderCopyIcon fontSize='large' />
                </div>
            </div>
            <button onClick={() => onSetCoverColor(null)}>Remove cover</button>
            <h4>Colors</h4>
            <div className='cover-colors'>
                {colors.map((color, idx) =>
                    <button onClick={() => onSetCoverColor(color)} key={idx} style={{ backgroundColor: color }}></button>
                )}
            </div>
            <h4>Photos from Unsplash</h4>
            <div className='cover-imgs'>
                {imgUrls.map((url, idx) =>
                    <div key={idx} className="img-container" onClick={() => onSetCoverImg(url)}><img src={url} alt="" /></div>
                )}
            </div>
        </div>
    )
}