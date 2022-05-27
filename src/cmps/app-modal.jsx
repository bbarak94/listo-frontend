
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { Labels } from './dynamic-cmps/labels'
import { Members } from './dynamic-cmps/members'
import { Cover } from './dynamic-cmps/cover'
import { Dates } from './dynamic-cmps/dates'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 30,
    border: 'none',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    p: 0,
    borderRadius: '3px',
      boxShadow: 24,
}

export function AppModal({ isOpen, setIsOpen, cmpType, task, boardId, groupId }) {

    const getType = () => {
        switch (cmpType) {
            case 'labels':
                return <Labels task={task} boardId={boardId} groupId={groupId} handleClose={handleClose}/>
            case 'members':
                return <Members task={task} boardId={boardId} groupId={groupId} handleClose={handleClose}/>
            case 'cover':
                return <Cover task={task} boardId={boardId} groupId={groupId} handleClose={handleClose}/>
            case 'dates':
                return <Dates task={task} boardId={boardId} groupId={groupId} handleClose={handleClose}/>
        }
    }

    const [open, setOpen] = React.useState(isOpen);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setIsOpen(false)
    }

    React.useEffect(() => {
        setOpen(isOpen)
    }, [isOpen])



    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                BackdropProps={{invisible: true}}
            >
                <Box sx={style}>
                    {getType()}
                </Box>
            </Modal>
        </div>
    );
}
