import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { TaskEdit } from './task-edit'
import { Screen } from './screen'

import moment from 'moment'

import clock from '../assets/img/task/navbar/dates.svg'
import checkBox from '../assets/img/checkbox.svg'

// import { setTask } from "../store/actions/board.action"
import { labelService } from "../services/label.service"
import { boardService } from "../services/board.service"

export const TaskPreview = ({ task, board, group, onOpenModal, setTaskEditExpand, taskEditExpandId, setIsScrollBar }) => {


    const [isMouseOver, setIsMouseOver] = useState(false)
    const [style, setStyle] = useState({ top: '', left: '', width: '' })
    const dispatch = useDispatch()
    const noColorIndication = '#B3BAC5'
    // useEffect(() => {
    // }, [])

    const onOpenTaskEdit = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()

        // ****** Task edit relative to task preview *********
        // const bodyRect = document.body.getBoundingClientRect()
        let elemRect = ev.target.parentNode.getBoundingClientRect()
        let top = elemRect.top - window.pageYOffset
        let left = elemRect.left - window.pageXOffset
        // const top = elemRect.top - bodyRect.top
        // const left = elemRect.left - bodyRect.left

        // ****** Task edit width relative to task preview width *********
        const width = ev.target.parentNode.offsetWidth
        // if (width === 248) setIsScrollBar(true)

        // console.log(ev.target.parentNode)
        // console.log(ev.target);
        // console.log('x', window.width - ev.target.get)
        // console.log('y', window.width - ev.target.offsetY)
        setStyle({ top, left, width })
        setTaskEditExpand(task.id)



        // function outputsize() {
        //     const width = ev.target.offsetWidth
        // }
        // outputsize()

        // new ResizeObserver(outputsize).observe(ev.target)
    }

    const taskBorderRadius =
        task.style.color || task.style.imgUrl ? '0 0 3px 3px' : '3px'

    return (
        <div className="task-preview-helper">
            <Link to={`/board/${board._id}/task/${task.id}`}>
                <div className="task-preview-container flex column">

                    <div className="task-preview">
                        {task.style.color && <div className="task-preview-color" style={{ backgroundColor: task.style.color }}>
                        </div>
                        }
                        {task.style.imgUrl && <div className="task-preview-img-container">
                            <img src={task.style.imgUrl} />
                        </div>
                        }

                        {task.labelIds && (
                            <div className='task-preview-labels flex'>
                                {labelService
                                    .getLabelsByIds(task.labelIds, board)
                                    .map((l) => {
                                        return (l.color !== noColorIndication && <div
                                            key={l.id}
                                            className='task-preview-label'
                                            style={{
                                                backgroundColor: l.color,
                                            }}
                                        ></div>
                                        )
                                    })}
                            </div>
                        )}


                        {/* <div className='members-list-container flex column'>
                            <div className='members-avatars-container flex'>
                            {boardService.getMembersByIds(task.memberIds, board)?.map((member) => {
                                    return (
                                        <div key={member.id} className='member-container flex' onClick={(ev) => {
                                            ev.preventDefault()
                                            onOpenModal('member', member)}}>
                                            <img src={member.imgUrl} />
                                            </div>
                                            )
                                        })}
                                        </div>
                                    </div>  */}

                        <div
                            className='preview-title flex space-between'
                            style={{ borderRadius: taskBorderRadius }}
                        >
                            <div
                                className='task-preview-title'>
                                <span

                                >
                                    {task.title}
                                </span>
                            </div>
                            <p
                                className='edit-icon'
                                onClick={onOpenTaskEdit}
                            ></p>
                        </div>

                        {(task.memberIds?.length ||
                            task.labelIds?.length ||
                            task.dueDate) && (
                                <div className='flex space-between'>
                                    {task.dueDate && (
                                        <div
                                            className='task-preview-date flex'
                                            onMouseOver={() => setIsMouseOver(true)}
                                            onMouseOut={() => setIsMouseOver(false)}
                                        >
                                            {!isMouseOver && (
                                                <img src={clock} alt='' />
                                            )}
                                            {isMouseOver && (
                                                <img src={checkBox} alt='' />
                                            )}
                                            <span>
                                                {moment(task.dueDate).format(
                                                    'MMMM D'
                                                )}
                                            </span>
                                        </div>
                                    )}

                                    <div className='members-list-container flex column'>
                                        <div className='members-avatars-container-task-preview flex'>
                                            {boardService
                                                .getMembersByIds(
                                                    task.memberIds,
                                                    board
                                                )
                                                ?.map((member) => {
                                                    return (
                                                        <div
                                                            key={member.id}
                                                            className='member-container flex' 
                                                            onClick={(ev) => {
                                                                ev.preventDefault()
                                                                onOpenModal(ev, 'member', member)
                                                            }}
                                                        >
                                                            <img
                                                                src={member.imgUrl}
                                                            />
                                                        </div>
                                                    )
                                                })}
                                        </div>
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </Link>
            {taskEditExpandId === task.id && <Screen cb={() => setTaskEditExpand(null)} />}
            {taskEditExpandId === task.id && <TaskEdit task={task} board={board} group={group} setTaskEditExpand={setTaskEditExpand} style={style} />}
        </div>

    )
}
