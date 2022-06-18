import { useState } from 'react'
import { useDispatch } from 'react-redux'

import moment from 'moment'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import VideoLabelOutlinedIcon from '@mui/icons-material/VideoLabelOutlined'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'

import { updateTask } from '../../store/actions/board.action'

export const TaskDetailsAttachments = ({ task, boardId, groupId }) => {
   const [title, setTitle] = useState(false)
   const [isEditTitle, setIsEditTitle] = useState(false)
   const dispatch = useDispatch()

   const handleTitleChange = (ev) => {
      setTitle(ev.target.value)
   }

   const handleSubmit = (ev, att, idx) => {
      const newTask = { ...task }
      const newAtt = { ...att }
      newAtt.title = title
      newTask.attachments.splice(idx, 1)
      newTask.attachments.unshift(newAtt)
      dispatch(updateTask(newTask, boardId, groupId))
      setIsEditTitle(false)
   }

   const onRemove = (ev, att, idx) => {
      const newTask = { ...task }
      newTask.attachments.splice(idx, 1)
      dispatch(updateTask(newTask, boardId, groupId))

   }

   const onEdit = () => {
      setIsEditTitle(true)
   }

   if (!task.attachments.length) return <></>
   return <div className='task-attachments'>
      <div className="attachment-header flex">
         <div className='task-details-left-icon flex'>
            <AttachFileIcon
               style={{ width: '25px', transform: 'rotate(45deg)' }}
            />
         </div>
         <h1>attachments</h1>
      </div>
      <div className='imgs-container flex column' >

         {task.attachments.map((att, idx) => (
            <div key={idx} className='attachment-container flex'>
               <div className='img-container flex'>
                  <img src={att.url} />
               </div>
               <div className='attachment-details'>
                  <div className='flex'>
                     {!isEditTitle && <h1>{att.title} </h1>}
                     {isEditTitle &&
                        (
                           <form>
                              <input
                                 onChange={handleTitleChange}
                                 placeholder={att.title}
                              ></input>
                              <button onClick={(ev) => {
                                 ev.stopPropagation()
                                 ev.preventDefault()
                                 handleSubmit(ev, att, idx)
                              }
                              }>Save</button>
                           </form>

                        )}
                     <ArrowRightAltIcon style={{ transform: 'rotate(-45deg)', width: '16px' }} />
                  </div>
                  <div className='actions flex'>
                     {(Date.now() - att.createdAt < 30000) && <h2 className='date'> just now </h2>}
                     {(Date.now() - att.createdAt > 30000) && <h2 className='date'>{(moment(att.createdAt).fromNow())}</h2>}
                     <h3>
                        -
                        <span onClick={(ev) => onRemove(ev, att, idx)}>Delete</span>
                        -
                        <span onClick={() => onEdit()}>Edit</span>
                     </h3>
                  </div>
                  <div className='make-cover flex'>
                     <div className='flex align-center'>
                        <VideoLabelOutlinedIcon style={{ width: '16px' }} />
                     </div>
                     <span>Make cover</span>
                  </div>
               </div>
            </div>
         )
         )}
      </div>
   </div>
}