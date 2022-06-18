import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import FastAverageColor from 'fast-average-color';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BarChartIcon from '@mui/icons-material/BarChart';
import FilterListIcon from '@mui/icons-material/FilterList';

import star from '../../assets/img/workspace/star-stroke.svg'
import starFill from '../../assets/img/workspace/star-fill.svg'

import { Dashboard } from './dashboard'
import { AppModal } from '../app-modal'

import { saveBoard } from '../../store/actions/board.action'

const iconStyle = { fontSize: '16px' }
export const BoardHeader = ({ board, setLabelExpand, setTitleLabelClass, setLabelTitleDelay, titleLabelClass }) => {

    const dispatch = useDispatch()

    const [isOpen, setIsOpen] = useState(false)
    const [cmpType, setCmpType] = useState('')
    const [member, setMember] = useState(null)
    const [modalPosition, setModalPosition] = useState({})
    const [theme, setTheme] = useState({})
    const [isDashboardOpen, setIsDashboardOpen] = useState(false)

    useEffect(() => {
        changeHeaderColor()
    }, [board])

    const onOpenModal = (ev, type, member) => {
        let elemRect = ev.currentTarget.getBoundingClientRect()
        let top = elemRect.top - window.pageYOffset
        let left = elemRect.left - window.pageXOffset
        const height = ev.currentTarget.offsetHeight
        top += height

        if (type === 'workspace-nav-modal') left -= 80
        setModalPosition({ top, left })
        setIsOpen(true)
        setCmpType(type)
        setMember(member)
    }

    const onStarBoard = () => {
        board.isStar = !board.isStar
        dispatch(saveBoard(board))
    }

    const changeHeaderColor = async () => {
        const fac = new FastAverageColor()

        try {
            const averageColor = await fac.getColorAsync(board.style.background)
            const color = averageColor.isDark ? '#fff' : '#172B4D'
            const newTheme = { color }
            setTheme(newTheme)
        }
        catch (err) {
            console.log('err:', err)
        }

    }

    const handelScreenClick = () => {
        setIsDashboardOpen(false)
    }

    return (<>
        <div className='board-header-right-container' style={theme}>
            <div className='board-title-btn'>
                <h2>{board.title}</h2>
            </div>
            <div className='board-star' onClick={onStarBoard}>
                {!board.isStar && <img className='stroke' src={star} alt='' />}
                {board.isStar && <img className='fill' src={starFill} alt='' />}
            </div>

            <span className='sep'>|</span>

            <div className='board-header-btn workspace-btn' onClick={(ev) => onOpenModal(ev, 'workspace-nav-modal')} >
                <span style={theme}>  Workspace</span>
            </div>

            <span className='sep'>|</span>

            <div className='members-list-container flex column'>
                <div className='members-avatars-container flex'>
                    {board.members.map((member, idx) => {
                        return (
                            <div key={idx} className='member-container flex' onClick={(ev) => onOpenModal(ev, 'member', member)}>
                                <img src={member.imgUrl} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
        <div className="board-header-left-container">

            <div style={theme} className="dashboard-btn flex" onClick={() => setIsDashboardOpen(true)}>
                <BarChartIcon style={iconStyle} />
                <span >Dashboard</span>
            </div>

            <div className='filter-btn flex' style={theme} onClick={() => {
                setModalPosition({ top: '43px', right: '0' })
                setIsOpen(true)
                setCmpType('filter')
            }}>
                <FilterListIcon style={iconStyle} />
                Filter
            </div>
            <div style={theme} className='show-menu-btn flex' onClick={() => {
                setModalPosition({ top: '45px', right: '0' })
                setIsOpen(true)
                setCmpType('menu')
            }}>
                <MoreHorizIcon style={iconStyle} />
                Show menu
            </div>

            {isDashboardOpen && <Dashboard board={board} exit={handelScreenClick} />}

            <AppModal
                onOpenModal={onOpenModal}
                setLabelExpand={setLabelExpand}
                setTitleLabelClass={setTitleLabelClass}
                setLabelTitleDelay={setLabelTitleDelay}
                titleLabelClass={titleLabelClass}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                cmpType={cmpType}
                board={board}
                position={modalPosition}
                member={member}
            />
        </div>
    </>)
}