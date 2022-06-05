
import { useEffect, useState } from 'react'

import { AppModal } from './app-modal'
import star from '../assets/img/workspace/star-stroke.svg'
import starWhite from '../assets/img/workspace/star-stroke-white.svg'
import filter from '../assets/img/icon/filter.svg'
import starFill from '../assets/img/workspace/star-fill.svg'

import { saveBoard } from '../store/actions/board.action'
import { useDispatch } from 'react-redux'
import FastAverageColor from 'fast-average-color';


export const BoardHeaderNavBar = ({ board, setLabelExpand, setTitleLabelClass , setLabelTitleDelay, titleLabelClass}) => {

    const dispatch = useDispatch()

    const [isOpen, setIsOpen] = useState(false)
    const [cmpType, setCmpType] = useState('')
    const [member, setMember] = useState(null)
    const [modalPosition, setModalPosition] = useState({})
    const [theme, setTheme] = useState({})

    useEffect(() => {
        changeHeaderColor()

    }, [board])

    const onOpenModal = (ev, type, member) => {

        let elemRect = ev.currentTarget.getBoundingClientRect()
        let top = elemRect.top - window.pageYOffset
        let left = elemRect.left - window.pageXOffset
        const height = ev.currentTarget.offsetHeight
        top += height

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
            const color = averageColor.isDark ? '#fff' : '#000'
            const newTheme = { color }
            setTheme(newTheme)
        }
        catch (err) {
            console.log('err:', err)
        }

    }

    return (<>
        <div className="board-header-right-container" style={theme}>
            <div className="board-title-btn">
                <h2>{board.title}</h2>
            </div>
            <div className="board-star" onClick={onStarBoard}>
                {!board.isStar && <img className='stroke' src={star} alt="" />}
                {board.isStar && <img className='fill' src={starFill} alt="" />}
            </div>

            <span className='sep'>|</span>

            <div className="board-header-btn workspace-btn" onClick={(ev) => onOpenModal(ev, 'workspace-nav-modal')} >
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
            <div className='flex filter-btn show-menu-btn' style={{marginRight:'10px'}} onClick={() => {
                setModalPosition({ top: '43px', right: '0' })
                setIsOpen(true)
                setCmpType('filter')
            }}>
                <div className='filter-icon-container flex align-center'>
                    <img src={filter} alt="" />
                </div>
                <span className='board-header-btn' style={theme}>Filter</span>
            </div>
            <div className="show-menu-btn" onClick={() => {
                // setModalPosition({ top: '43px', right: '0' })
                // setIsOpen(true)
                // setCmpType('menu')
            }}>
                <span className='board-header-btn' style={theme}>... Show menu</span>
            </div>

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