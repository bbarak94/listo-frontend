import AttachFileIcon from '@mui/icons-material/AttachFile'

export const TaskDetailsAttachments = ({ task, boardId, groupId }) => {
   console.log('task:', task)

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
      <div className='imgs-container flex'>

      {task.attachments.map((att) => (
         <div className='img-container flex'>
            <img src={att} />
         </div>
      )
      )}
      </div>
   </div>
}