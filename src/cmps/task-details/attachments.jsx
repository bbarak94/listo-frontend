
import { useDispatch } from 'react-redux'

import { cloudinaryService } from '../../services/cloudinary-service'
import { utilService } from '../../services/util.service'
import {updateTask} from '../../store/actions/board.action'

export const Attachments = ({ task, board, group }) => {
   const dispatch = useDispatch()
   const onUploadImg = async (ev) => {
      const thumbnail = await cloudinaryService.uploadImg(ev)
      const newAtt={
         id:utilService.makeId(),
         title:'New Attachment',
         url:thumbnail,
         createdAt:Date.now()
      }
      const newTask = {...task}
      newTask.attachments.unshift(newAtt)
      dispatch(updateTask(newTask, board._id, group.id))
   }

   return (
      <div className='attachments-popup'>
         <div className='title-container flex'>
            <h1>Attach from...</h1>
         </div>
         <hr></hr>
         <label>
            <input className="upload-img" onChange={onUploadImg} type='file' />
         </label>
         <hr></hr>
         <h3>Attach a link</h3>
         <input className="link-img" placeholder="Paste any link here..."></input>
      </div>
   )
}