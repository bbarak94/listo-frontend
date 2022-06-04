

import OutlinedInput from '@mui/material/OutlinedInput'

export const FilterModal = ({ handleClose, board , setLabelExpand, setTaskEditExpand }) => {
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
    />
</div>
<h3>Search cards, members,labels,and more.</h3>

<h2>Members</h2>
<h2>Due date</h2>
<h2>labels</h2>



</div>

}
