
import * as React from 'react'
import { useDispatch } from 'react-redux'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker'
import Grid from '@mui/material/Grid'

import { updateTask } from '../../store/actions/board.action'

export const Dates = ({ task, board, group, handleClose }) => {

  const dispatch = useDispatch()
  const [date, setDate] = React.useState(new Date)

  const onHandleSave = () => {
    const taskToUpdate = { ...task }
    taskToUpdate.dueDate = date.getTime()
    dispatch(updateTask(taskToUpdate, board._id, group.id))
    handleClose(false)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className='dates flex column justify-center align-center' style={{ padding: '14px' }}>
        <h3>Dates</h3>
        <hr />
        <Grid item xs={12} md={6} >
          <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)} minHeight='230px' />
        </Grid>
        <button onClick={onHandleSave} className='btn'>Save</button>
      </div>
    </LocalizationProvider>
  )
}
