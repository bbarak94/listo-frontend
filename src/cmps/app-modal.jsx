
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import { Labels } from './dynamic-cmps/labels'
import { EditLabel } from './dynamic-cmps/edit-label'
import { Members } from './dynamic-cmps/members'
import { Cover } from './dynamic-cmps/cover'
import { Dates } from './dynamic-cmps/dates'
import { Attachments } from './dynamic-cmps/attachments.jsx'
import { Member } from './dynamic-cmps/member'
import { Checklist } from './dynamic-cmps/checklist'
import { AddBoard } from './dynamic-cmps/add-board';
import { WorkspaceNavModal } from './dynamic-cmps/workspace-nav-modal';
import { MenuModal } from './dynamic-cmps/menu-modal.jsx';

const buttonHeight = 32

export function AppModal({ isOpen, setIsOpen, cmpType, task, board, group, member, labelId, position = { top: '50%', left: '50%' } }) {
    const getType = () => {
        switch (cmpType) {
            case 'labels':
                return <Labels task={task} board={board} group={group} handleClose={handleClose} />
            case 'edit-label':
                return <EditLabel task={task} board={board} group={group} labelId={labelId} handleClose={handleClose} />
            case 'members':
                return <Members task={task} board={board} group={group} handleClose={handleClose} />
            case 'member':
                return <Member task={task} board={board} group={group} handleClose={handleClose} member={member} />
            case 'cover':
                return <Cover task={task} board={board} group={group} handleClose={handleClose} />
            case 'dates':
                return <Dates task={task} board={board} group={group} handleClose={handleClose} />
            case 'attachment':
                return <Attachments task={task} board={board} group={group} handleClose={handleClose} />
            case 'checklist':
                return <Checklist task={task} board={board} group={group} handleClose={handleClose} />
            case 'add-board':
                return <AddBoard task={task} board={board} group={group} handleClose={handleClose} />
            case 'workspace-nav-modal':
                return <WorkspaceNavModal task={task} board={board} group={group} handleClose={handleClose} />
            case 'menu':
                return <MenuModal task={task} board={board} group={group} handleClose={handleClose} />
        }
    }

    const getCmpHeight = (cmpType) => {

        switch (cmpType) {
            case 'labels':
                return 411
            case 'edit-label':
                return 330
            case 'members':
                return 310
            case 'cover':
                return 471
            case 'dates':
                return 437
            case 'attachment':
                return 180
            case 'checklist':
                return 293
        }
    }

    const [open, setOpen] = useState(isOpen);
    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        handleOpen(false)
        setIsOpen(false)
    }

    useEffect(() => {
        setOpen(isOpen)
    }, [isOpen])

    const style = {
        position: 'absolute',
        right: position.right,
        top: position.top,
        left: position.left,
        zIndex: 30,
        border: 'none',
        outLine: 'none',
        width: 'auto',
        bgcolor: 'background.paper',
        p: 0,
        borderRadius: '3px',
        boxShadow: 24,
    }

    if (cmpType === 'menu') {
        style.top = '36px'
    }

    const cmpHeight = getCmpHeight(cmpType)
    if (style.top + cmpHeight > window.innerHeight) style.top -= (cmpHeight + buttonHeight)

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            BackdropProps={{ invisible: true, open: true }}
        >
            <Box sx={style}>
                {getType()}
            </Box>
        </Modal>
    );
}
