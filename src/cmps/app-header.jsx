import navBar from '../assets/img/header/navbar.svg'
import downArrow from '../assets/img/header/down-arrow.svg'
import Button from '@mui/material/Button'
import { useNavigate,useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppModal } from './app-modal'
import { useEffect, useState } from 'react'
import { logout } from '../store/actions/user.action'
import { useDispatch } from 'react-redux'
import { userService } from '../services/user.service'
import FastAverageColor from 'fast-average-color';



export const AppHeader = () => {
    const user = userService.getLoggedinUser()
    
    if (user?.password) delete user.password
    const { board } = useSelector((storeState) => storeState.boardModule)
    
    const location = useLocation()
    // const { user } = useSelector((storeState) => storeState.userModule)
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [cmpType, setCmpType] = useState('')
    const [member, setMember] = useState(user)
    const [theme, setTheme] = useState({})
    const navigation = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        changeHeaderColor()

    }, [board])

    const onOpenModal = (type, member) => {
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
            const mashu = await fac.getColorAsync(board.style.background)
            // console.log('mashu:',mashu)            
            const backgroundColor = mashu.rgba;
            const color = mashu.isDark ? '#fff' : '#000'
            if (location.pathname==='/workspace') newTheme = { backgroundColor:"#026aa7", color:'white' }
            else newTheme = { backgroundColor, color }
            setTheme(newTheme)
        }
        catch (err) {
            console.log('location.pathname:',location.pathname)
            if (location.pathname==='/workspace') var newTheme = { backgroundColor:"#026aa7", color:'white' }
            setTheme(newTheme)
            // console.log('err:', err)
        }

    }


    return (
        <div className='app-header flex align-center' style={theme}>
            <div className='app-header-btn-container flex'>
                <div className='app-header-navbar-container'>
                    <img
                        src={navBar}
                        alt='navigate'
                        style={{ width: '22px' }}
                    />
                </div>

                <div
                    className='app-header-logo-static flex'
                    style={{ width: '80px' }}
                    onClick={() => {
                        navigation(`/`)
                    }}
                >
                    <img
                        src='https://res.cloudinary.com/bbarak94/image/upload/v1653768105/ListoStatic2_z2ecxu.gif'
                        alt='navigate'
                        style={{ maxWidth: '110px' }}
                        onMouseOver={(ev) => {
                            ev.target.src =
                                'https://res.cloudinary.com/bbarak94/image/upload/v1653770099/Listo2-3_modsj8.gif'
                        }}
                        onMouseOut={(ev) => {
                            ev.target.src =
                                'https://res.cloudinary.com/bbarak94/image/upload/v1653768105/ListoStatic2_z2ecxu.gif'
                        }}
                    />
                </div>

                <Button className='app-header-btn'>
                    Workspaces
                    <div className='app-header-navbar-container'>
                        <img
                            src={downArrow}
                            alt='navigate'
                            style={{ width: '22px' }}
                        />
                    </div>
                </Button>
                <Button className='app-header-btn'>
                    Recent
                    <div className='app-header-navbar-container'>
                        <img
                            src={downArrow}
                            alt='navigate'
                            style={{ width: '22px' }}
                        />
                    </div>
                </Button>
                <Button className='app-header-btn'>
                    Starred
                    <div className='app-header-navbar-container'>
                        <img
                            src={downArrow}
                            alt='navigate'
                            style={{ width: '22px' }}
                        />
                    </div>
                </Button>
                <Button className='app-header-btn'>
                    Templates
                    <div className='app-header-navbar-container'>
                        <img
                            src={downArrow}
                            alt='navigate'
                            style={{ width: '22px' }}
                        />
                    </div>
                </Button>
                {user?.imgUrl && (
                    <div className='welcome flex align-center'>
                        {user.username !== 'guest' && (
                            <h3 className='logout-btn' onClick={onLogout}>Logout</h3>
                        )}
                        {user.username === 'guest' && (
                            <h3 className='login-btn' onClick={() => navigation('/login')}>Login</h3>
                        )}

                        <div
                            className='user-container flex'
                            onClick={() => onOpenModal('member', user)}
                        >
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
            />
        </div>
    )
}
