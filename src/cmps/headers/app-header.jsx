import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppModal } from '../app-modal'
import { useEffect, useState } from 'react'
import { logout } from '../../store/actions/user.action'
import { useDispatch } from 'react-redux'
import { userService } from '../../services/user.service'
import FastAverageColor from 'fast-average-color';

export const AppHeader = () => {
    const user = userService.getLoggedinUser()

    if (user?.password) delete user.password
    const { board } = useSelector((storeState) => storeState.boardModule)

    const location = useLocation()
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [cmpType, setCmpType] = useState('')
    const [member, setMember] = useState(user)
    const [theme, setTheme] = useState({})
    const [modalPosition, setModalPosition] = useState({})
    const navigation = useNavigate()
    const dispatch = useDispatch()

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

    const onLogout = async () => {
        setLoggedIn(!isLoggedIn)
        dispatch(logout())
        navigation('/')
    }

    const changeHeaderColor = async () => {
        const fac = new FastAverageColor()

        try {
            var newTheme
            const averageColor = await fac.getColorAsync(board.style.background)
            const backgroundColor = averageColor.rgba;
            const color = averageColor.isDark ? '#fff' : '#000'
            if (location.pathname === '/workspace') newTheme = { backgroundColor: "#026aa7", color: 'white' }
            else newTheme = { backgroundColor, color }
            setTheme(newTheme)
        }
        catch (err) {
            if (location.pathname === '/workspace') var newTheme = { backgroundColor: "#026aa7", color: 'white' }
            setTheme(newTheme)
        }
    }

    return (
        <div className='app-header flex align-center' style={theme}>
            <div className='app-header-btn-container flex'>
                <div
                    className='app-header-logo-static flex'
                    style={{ width: '80px' }}
                    onClick={() => {
                        navigation(`/`)
                    }}
                >
                    <img
                        src='https://res.cloudinary.com/bbarak94/image/upload/v1654493829/ListoStatic2_-_Copy_zralmd.gif'
                        alt='navigate'
                        style={{ maxWidth: '110px' }}
                        onMouseOver={(ev) => {
                            ev.target.src =
                                'https://res.cloudinary.com/bbarak94/image/upload/v1653770099/Listo2-3_modsj8.gif'
                        }}
                        onMouseOut={(ev) => {
                            ev.target.src =
                                'https://res.cloudinary.com/bbarak94/image/upload/v1654493829/ListoStatic2_-_Copy_zralmd.gif'
                        }}
                    />
                </div>

                {user?.imgUrl && (
                    <div className='user-login flex align-center'>
                        {user.username === 'guest' && (
                            <h3 className='login-btn' onClick={() => navigation('/login')}>Login</h3>
                        )}

                        <div className='img-container flex' onClick={(ev) => onOpenModal(ev, 'member', user)}>
                            <img
                                src={user.imgUrl}
                                style={{
                                    width: '34px',
                                    height: '34px',
                                    borderRadius: '50%',
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
            <AppModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                cmpType={cmpType}
                member={member}
                position={modalPosition}
                onLogout={onLogout}
                renderFrom={'header'}
            />
        </div>
    )
}
