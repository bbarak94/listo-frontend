import navBar from '../assets/img/header/navbar.svg'
import downArrow from '../assets/img/header/down-arrow.svg'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppModal } from './app-modal'
import { useState } from 'react'
import {logout} from '../store/actions/user.action'
import { useDispatch } from 'react-redux'

export const AppHeader = () => {
    const { user } = useSelector((storeState) => storeState.userModule)
    console.log('user:', user)
    const [isOpen, setIsOpen] = useState(false)
    const [cmpType, setCmpType] = useState('')
    const [member, setMember] = useState(user)
    const navigation = useNavigate()
    const dispatch = useDispatch()


    const onOpenModal = (type, member) => {
        setIsOpen(true)
        setCmpType(type)
        setMember(member)
    }



    const onLogout = async () =>{
        dispatch(logout())
    }


    return (
        <div className='app-header flex align-center'>
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
                    <div className='wellcome flex align-center'>
                    <h3 className='logout-btn' onClick={onLogout}>logout</h3>
                        <h1 className='wellcome-msg'>
                            Wellcome {user.fullname}
                        </h1>
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
