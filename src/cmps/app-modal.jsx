
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import { Labels } from './dynamic-cmps/labels'
import { EditLabel } from './dynamic-cmps/edit-label'
import { Members } from './dynamic-cmps/members'
import { Cover } from './dynamic-cmps/cover'
import { Dates } from './dynamic-cmps/dates'
import { Member } from './dynamic-cmps/member'
import { Checklist } from './dynamic-cmps/checklist'
import { AddBoard } from './dynamic-cmps/add-board';
import { WorkspaceNavModal } from './dynamic-cmps/workspace-nav-modal';
import { MenuModal } from './dynamic-cmps/menu-modal.jsx';

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

    const [open, setOpen] = React.useState(isOpen);
    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        handleOpen(false)
        setIsOpen(false)
    }

    React.useEffect(() => {
        setOpen(isOpen)
    }, [isOpen])

    const style = {
        position: 'absolute',
        // top: position.top,
        right:position.right,
        top: position.top + position.height,
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
    if(cmpType === 'menu'){
        style.top = '36px'
    }
    

    return (
        // <div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            BackdropProps={{ invisible: true, open: true}}
            // disableEnforceFocus 
        // BackdropProps={{ open: false}}
        >
            <Box sx={style}>
                {getType()}
            </Box>
        </Modal>
        // </div>
    );
}
