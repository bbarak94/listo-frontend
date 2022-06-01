import AttachFileIcon from '@mui/icons-material/AttachFile'
import VideoLabelOutlinedIcon from '@mui/icons-material/VideoLabelOutlined'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';


import moment from 'moment'

export const TaskDetailsAttachments = ({ task, boardId, groupId }) => {
   // console.log('task:', task)


   const onComment = (att) => {
      console.log('comment')
      console.log('att:', att)
   }
   const onRemove = (att) => {
      console.log('remove')
      console.log('att:', att)
   }
   const onEdit = (att) => {
      console.log('edit')
      console.log('att:', att)
   }

   if (!task?.attachments) return <h1>no attachments</h1>
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

         {task.attachments.map((att) => (
            <div className='attachment-container flex'>
               <div className='img-container flex'>
                  <img src={att.url} />
               </div>
               <div className='attachment-details'>
                  <div className='flex'>
                     <h1>{att.title} </h1>
                     <ArrowRightAltIcon style={{ transform: 'rotate(-45deg)', width: '16px' }} />
                  </div>
                  <div className='flex'>
                     {(Date.now() - att.createdAt < 30000) && <h2 className='date'> just now </h2>}
                     {(Date.now() - att.createdAt > 30000) && <h2 className='date'>{(moment(att.createdAt).fromNow())}</h2>}
                     <h3>
                        {' '}-{' '}
                        <span onClick={(att) => onComment(att)}>Comment</span>
                        -
                        <span onClick={(att) => onRemove(att)}>Delete</span>
                        -
                        <span onClick={(att) => onEdit(att)}>Edit</span>
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