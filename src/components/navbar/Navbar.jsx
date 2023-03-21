
import {NavLink , Link} from 'react-router-dom'
import { useContext, useState} from 'react';
import {AuthContext} from '../../authContext.js'
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';


const Navbar = ({larger, connect}) => {
    const { userInfos, logout} = useContext(AuthContext)
    const url = "https://blog-2023-backend.onrender.com/images/"
    const id = userInfos && userInfos._id

    const [openMenu, setOpenMenu] = useState(false)

    return (
        <>
            <div className={larger === true ? "Navbar Larger" : "Navbar"}>
                <div className="mainNavbar">
                    <Link className={connect ? 'logoNav connect' : 'logoNav'} to={`/`}>Just Write</Link>
                    {!connect && 
                        <>
                            <div className="mainNavbar_menu">
                                <NavLink to='/' end className={({isActive}) => isActive ? "navLink active": "navLink"}>Accueil</NavLink>
                                <NavLink to={`/about/${id}`} className={({isActive}) => isActive ? "navLink active": "navLink"}>À propos</NavLink>
                                <NavLink to='/write' className={({isActive}) => isActive ? "navLink active": "navLink"}>Écrire</NavLink>
                                <NavLink to='/contact' className={({isActive}) => isActive ? "navLink active": "navLink"}>Contact</NavLink>
                            </div>
                            <div className='menuMediaQ'>
                            {openMenu ? 
                            (<CloseIcon onClick={() => setOpenMenu(false)} className='menuMediaQ_icon'/>): 
                            (<MenuIcon onClick={() =>setOpenMenu(true)} className='menuMediaQ_icon'/>) }
                            {openMenu && 
                                <div className='menuMediaQ_link'>
                                    <NavLink to='/' end className="menuListe">Accueil</NavLink>
                                    <NavLink to={`/about/${id}`} className="menuListe">À propos</NavLink>
                                    <NavLink to='/write' className="menuListe">Écrire</NavLink>
                                    <NavLink to='/contact' className="menuListe">Contact</NavLink>
                                    <NavLink to='/update' className="menuListe">Profil</NavLink>
                                    <LogoutIcon className='menuListe icon' onClick={() => {logout()}}/>
                                </div>
                            }
                            </div>
                            <div className="mainNavbar_user">
                                <div className="navUserName">
                                    <span>Bonjour, </span>
                                    <span>{userInfos && userInfos.name}</span>
                                </div>
                                <Link className="navUserPic" to={`/update`}>
                                    <img src={userInfos && url + userInfos.photo} alt="" />
                                </Link>
                            </div>
                            <LogoutIcon className='logout' onClick={() => {logout()}}/>
                        </>
                    }
                </div>
            </div>
        </>
    );
};

export default Navbar;