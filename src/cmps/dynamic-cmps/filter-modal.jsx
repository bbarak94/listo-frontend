import { useSelector } from 'react-redux'


import OutlinedInput from '@mui/material/OutlinedInput'
import { useDispatch } from 'react-redux'
import { setFilter } from '../../store/actions/board.action'

import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

export const FilterModal = ({ handleClose, board, setLabelExpand, setTaskEditExpand }) => {
    const dispatch = useDispatch()
    const { filterBy } = useSelector((storeState) => storeState.boardModule)
    console.log('board:',board)
    
    const handleChange = (ev) => {
        const newFilterBy = {...filterBy}
        newFilterBy.txt = ev.target.value
        dispatch(setFilter(newFilterBy))
    }

    const addMember = (memberId) =>{
        console.log('memberId:',memberId)
        const newFilterBy = {...filterBy}
        newFilterBy.memberIds.unshift(memberId)
        dispatch(setFilter(newFilterBy))
    }
    const removeMember = (memberId) =>{
        console.log('memberId:',memberId)
        const newFilterBy = {...filterBy}
        console.log('newFilterBy.memberIds:',newFilterBy.memberIds)
        newFilterBy.memberIds = newFilterBy.memberIds.filter((member)=> member!==memberId)
        console.log('newFilterBy.memberIds:',newFilterBy.memberIds)
        dispatch(setFilter(newFilterBy))
    }

    const onToggleLabel = async (labelId) => {
        console.log('labelId:',labelId)
        
        // const updatedTask = await labelService.toggleLabel(labelId, task)
        // dispatch(updateTask(updatedTask, board._id, group.id))
    }

    const isLabelOnTask = (labelId) => {
        console.log('labelId:',labelId)
        
        // if (!task) return
        // if (!task.labelIds) task.labelIds = []
        // return task.labelIds.includes(labelId)
    }

    return <div className='filter-popup'>
        <div className='title-container flex'>
            <h1>Filter</h1>
        </div>
        <hr></hr>
        <br></br>
        <h2>Keyword</h2>
        <div className='input-container flex column'>
            <OutlinedInput
                autoFocus
                className='keyword-input'
                placeholder='Enter a keyword...'
                variant='filled'
                onChange={handleChange}
                value={filterBy.txt}
            />
        </div>
        <h3>Search cards, members,labels,and more.</h3>

        <h2>Members</h2>
        <div className='filter-members flex column'>
        {board.members.map((member,idx)=>{return (

            <div key={idx} className='filter-member flex align-center'>
            {(filterBy.memberIds.includes(member.id)) && <CheckBoxOutlinedIcon onClick={()=>removeMember(member.id)}/>}
            {(!filterBy.memberIds.includes(member.id)) && <CheckBoxOutlineBlankIcon onClick={()=>addMember(member.id)}/>}                 
            <div className='filter-member-img-container flex'>
                <img src={member.imgUrl} />
            </div>
            <h1>{member.fullname}</h1>
            </div>
        )
        })}
        </div>
        <br></br>
        <h2>Due date</h2>
        {/* {(filterBy.dueDate===null) && <CheckBoxOutlinedIcon onClick={()=>removeMember(member.id)}/>}
        {(!filterBy.dueDate.includes(member.id)) && <CheckBoxOutlineBlankIcon onClick={()=>addMember(member.id)}/>}    */}

        <h2>labels</h2>
        <ul className='label-list'>
                    {board.labels.map(label => {
                        return (
                            <li className='label-list-item' key={label.id} style={{ background: label.color }}
                                onClick={() => onToggleLabel(label)} >
                                <span>{label.title}</span>
                                {isLabelOnTask(label) && <span>✔</span>}
                            </li>
                        )
                    })}
                </ul>



    </div>

}
