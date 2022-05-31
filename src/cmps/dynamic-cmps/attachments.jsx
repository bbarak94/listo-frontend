
import { cloudinaryService } from '../../services/cloudinary-service'
export const Attachments = ({ task, board, group, handleClose }) => {


   const onUploadImg = async (ev) => {
      const thumbnail = await cloudinaryService.uploadImg(ev)
      console.log('thumbnail:',thumbnail)
      
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
         <input className="link-img" placeholder="Paste any link here...">

         </input>

      </div>
   )
}