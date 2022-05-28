
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import { Labels } from './dynamic-cmps/labels'
import { AddLabel } from './dynamic-cmps/add-label'
import { Members } from './dynamic-cmps/members'
import { Cover } from './dynamic-cmps/cover'
import { Dates } from './dynamic-cmps/dates'
import { Member } from './dynamic-cmps/member'
import { Checklist } from './dynamic-cmps/checklist'

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

export function AppModal({ isOpen, setIsOpen, cmpType, task, board, group, member }) {

    const getType = () => {
        switch (cmpType) {
            case 'labels':
                return <Labels task={task} board={board} group={group} handleClose={handleClose} />
            case 'add-label':
                return <AddLabel task={task} board={board} group={group} handleClose={handleClose} />
            case 'members':
                return <Members task={task} board={board} group={group} handleClose={handleClose} />
            case 'member':
                return <Member task={task} board={board} group={group} handleClose={handleClose} member={member} />
            case 'cover':
                return <Cover task={task} board={board} group={group} handleClose={handleClose} />
            case 'dates':
                return <Dates task={task} board={board} group={group} handleClose={handleClose} />
            case 'checklist':
                return <Checklist task={task} board={board} group={group} handleClose={handleClose} />
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
                BackdropProps={{ invisible: true }}
            >
                <Box sx={style}>
                    {getType()}
                </Box>
            </Modal>
        </div>
    );
}
