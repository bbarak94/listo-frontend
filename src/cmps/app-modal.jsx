import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import { Labels } from './dynamic-cmps/labels'
import { EditLabel } from './dynamic-cmps/edit-label'
import { Members } from './dynamic-cmps/members'
import { Cover } from './dynamic-cmps/cover'
import { Dates } from './dynamic-cmps/dates'
import { Attachments } from './task-details/attachments.jsx'
import { Member } from './dynamic-cmps/member'
import { Checklist } from './dynamic-cmps/checklist'
import { AddBoard } from './dynamic-cmps/add-board';
import { WorkspaceNavModal } from './dynamic-cmps/workspace-nav-modal';
import { MenuModal } from './dynamic-cmps/menu-modal.jsx';
import { FilterModal } from './dynamic-cmps/filter-modal.jsx';
import { DeleteGroupModal } from './dynamic-cmps/delete-group-modal.jsx';

const buttonHeight = 32

export function AppModal({ titleLabelClass, setLabelTitleDelay, setLabelExpand, setTitleLabelClass, isOpen, setIsOpen,
    cmpType, task, board, group, member, labelId, position = { top: '10%', left: '33.3%' }, setTaskEditExpand, renderFrom, onLogout }) {

    const getType = () => {
        switch (cmpType) {
            case 'labels':
                return <Labels task={task} board={board} group={group} handleClose={handleClose} />
            case 'edit-label':
                return <EditLabel task={task} board={board} group={group} labelId={labelId} handleClose={handleClose} />
            case 'members':
                return <Members task={task} board={board} group={group} handleClose={handleClose} />
            case 'member':
                return <Member task={task} board={board} group={group} handleClose={handleClose} member={member} renderFrom={renderFrom} onLogout={onLogout} />
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
            case 'delete-group-modal':
                return <DeleteGroupModal board={board} group={group} handleClose={handleClose} />
            case 'menu':
                return <MenuModal task={task} board={board} group={group} handleClose={handleClose} setLabelExpand={setLabelExpand}
                    setTitleLabelClass={setTitleLabelClass} titleLabelClass={titleLabelClass} setLabelTitleDelay={setLabelTitleDelay} />
            case 'filter':
                return <FilterModal task={task} board={board} group={group} handleClose={handleClose} setLabelExpand={setLabelExpand} setTaskEditExpand={setTaskEditExpand} />
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
            case 'member':
                return 230
            case 'cover':
                return 439
            case 'dates':
                return 437
            case 'attachment':
                return 180
            case 'checklist':
                return 293
        }
    }

    const getCmpWidth = (cmpType) => {
        switch (cmpType) {
            case 'labels':
                return 300
            case 'delete-group-modal':
                if (window.innerWidth < 490) return 230
                return 290
            case 'edit-label':
                return 308
            case 'members':
                return 300
            case 'member':
                return 311
            case 'cover':
                return 304
            case 'dates':
                return 348
            case 'attachment':
                return 330
            case 'checklist':
                return 330
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

    if (window.innerWidth < 490 && (cmpType === 'cover' || cmpType === 'attachment')) {
        if (cmpType === 'cover') {
            style.left = 40
            style.top = 155
        }
        else if (cmpType === 'attachment') {
            style.left = 40
            style.top = 375
        }
    }
    else {
        const cmpHeight = getCmpHeight(cmpType)
        if (style.top + cmpHeight > window.innerHeight) style.top -= (cmpHeight + buttonHeight)
        const cmpWidth = getCmpWidth(cmpType)
        if (style.left + cmpWidth > window.innerWidth) style.left -= (cmpWidth)
    }

    return (
        <Modal
            style={{
                overflowY: 'auto',
                overflowX: 'hidden',
            }}
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            BackdropProps={{ invisible: true, open: true, sx: { display: cmpType === 'menu' ? 'none' : 'flex' } }}
            onBackdropClick={(ev) => ev.stopPropagation()}
        >
            <Box sx={style} onClick={(ev) => ev.stopPropagation()}>
                {getType()}
            </Box>
        </Modal>
    );
}
