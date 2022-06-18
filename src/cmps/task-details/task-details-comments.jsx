import { useDispatch } from "react-redux"
import { useState, useEffect } from "react"

import moment from 'moment'
import CreditCardSharpIcon from '@mui/icons-material/CreditCardSharp'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';

import { userService } from '../../services/user.service'
import { utilService } from '../../services/util.service'
import { updateTask } from '../../store/actions/board.action'

export const TaskDetailsComments = ({ task, board, groupId }) => {

   const [user, setUser] = useState('')
   const [isTextOpen, setIsTextOpen] = useState(false)
   const [comment, setComment] = useState('')
   const dispatch = useDispatch()

   useEffect(() => {
      getUser()
   }, [])

   const getUser = async () => {
      const user = await userService.getLoggedinUser()
      setUser(user)
   }

   const handleChange = (ev) => {
      setComment(ev.target.value)
   }

   const handleSubmit = (ev) => {
      ev.stopPropagation()
      ev.preventDefault()

      const newTask = { ...task }
      newTask.comments.unshift({
         id: utilService.makeId(),
         createdAt: Date.now(),
         txt: comment,
         byMember: {
            fullname: user.fullname,
            imgUrl: user.imgUrl,
            _id: user._id
         }
      })
      dispatch(updateTask(newTask, board._id, groupId))
      setIsTextOpen(false)
      setComment('')

   }

   const onRemoveComment = (commentId) => {
      const newTask = { ...task }
      const newComments = newTask.comments.filter(c => c.id !== commentId)
      newTask.comments = newComments
      dispatch(updateTask(newTask, board._id, groupId))

   }

   const onCloseTxt = (ev) => {
      ev.preventDefault()
      ev.stopPropagation()
      setIsTextOpen(false)
   }

   if (!user) return <></>
   return (
      <div className="comments flex column">
         <div className="flex space-between" style={{ gap: '5px' }}>
            <div
               className='user-container flex'
            >
               <img
                  src={user.imgUrl}
                  style={{
                     width: '32px',
                     height: '32px',
                     borderRadius: '50%',
                  }}
               />
            </div>
            {!isTextOpen && (
               <div className="comments-box comments-box-closed">

                  <textarea
                     autoComplete='off'
                     spellCheck='false'
                     onClick={() => setIsTextOpen(true)}
                     rows={1}
                     placeholder='Write a comment...'
                  />
               </div>
            )}
            {isTextOpen && (
               <div className="comments-box comments-box-open">


                  <textarea
                     autoComplete='off'
                     spellCheck='false'
                     autoFocus
                     rows={1}
                     placeholder='Write a comment...'
                     onChange={handleChange}
                  />

                  <div className="comments-btns flex">

                     {!comment && (
                        <button className='save-btn save-btn-no'>Save</button>
                     )
                     }
                     {!comment && (
                        <button className='btn cancel-btn' onClick={onCloseTxt}>Cancel</button>
                     )}
                     {comment && (
                        <button className='btn save-btn-yes' onClick={handleSubmit}>Save</button>
                     )}
                     {comment && (
                        <button className='btn cancel-btn' onClick={onCloseTxt}>Cancel</button>
                     )}

                     <div className="comments-btns-right flex">
                        <div>
                           <AttachFileIcon
                              style={{ width: '16px', transform: 'rotate(45deg)' }}
                           />
                        </div>
                        <div>
                           <AlternateEmailIcon style={{ width: '16px' }} />
                        </div>

                        <div>
                           <SentimentSatisfiedAltIcon style={{ width: '16px' }} />
                        </div>
                        <div>
                           <CreditCardSharpIcon style={{ width: '16px' }} />
                        </div>

                     </div>
                  </div>

               </div>
            )}
         </div>

         <div className="comments-list flex column">
            {task.comments.map((comment, idx) => {
               return <div className="comment-main-container flex" key={idx}>
                  <div
                     className='user-container flex'
                  >
                     <img
                        src={comment.byMember.imgUrl}
                        style={{
                           width: '32px',
                           height: '32px',
                           borderRadius: '50%',
                        }}
                     />
                  </div>
                  <div className="comment-right-container flex column">
                     <div className="title flex">
                        <h1>{comment.byMember.fullname}</h1>
                        {(Date.now() - comment.createdAt < 30000) && <h2 className='date'> just now </h2>}
                        {(Date.now() - comment.createdAt > 30000) && <h2 className='date'>{(moment(comment.createdAt).fromNow())}</h2>}
                     </div>
                     <textarea
                        autoComplete='off'
                        spellCheck='false'
                        rows={1}
                        style={{ caretColor: 'transparent' }}
                        defaultValue={comment.txt}
                     />
                     <div className="comment-btns flex">
                        <div>
                           <AddReactionOutlinedIcon style={{ width: '16px' }} />
                        </div>
                        <h3> - <span>Edit</span> - <span onClick={() => onRemoveComment(comment.id)} >Delete</span></h3>

                     </div>
                  </div>
               </div>
            })}

         </div>
      </div>
   )
}