import { useRef ,useEffect, useState } from 'react'
import styles from './AuthMenu.module.css'
import { logout } from '../../firebase/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
const AuthMenu = ({ auth }) => {
    const [authMenuOpen, setAuthMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authMenuRef = useRef(null);
    const [fade, setFade] = useState();
    const closeMenu = () => {
        setFade(true);
        setTimeout(() => {
                setAuthMenuOpen(false);
                setFade(false);
        }, 200);
    }
    const handleClickOutside = (event) => {
        if(authMenuRef.current === null) return
        if (!authMenuRef.current.contains(event.target)) {
            closeMenu();
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [authMenuRef]);
    const logoutHandler = () => {
        logout().then((res) => {
            dispatch(uiActions.toggleSnackbar({
                value: true,
                type: 'alert',
                message: 'Log-out Success!'
            }))
            navigate('/');
        }).catch((er) => {
            navigate('/');
        })
    }
    const toggleMenu = () => {
        if (authMenuOpen) {
            closeMenu()
        } else {
            setAuthMenuOpen(true)
        }
    }
    useEffect(() => {
        closeMenu();
    },[navigate])
    return (
        <div className={styles.auth}>
            <div className={styles['auth-btn']} onClick={toggleMenu}>{auth.displayName}</div>
            {authMenuOpen && <div ref={authMenuRef} className={`${styles.container} ${fade ? styles['fade-out'] : styles['fade-in']}`}>
                <div className={styles.optionTitle}>
                    Options
                </div>
                <hr />
                <Link className={styles.options} to='/mypage/mask' style={{color:'var(--dark-color)'}}>
                    Mask
                </Link>
                <Link className={styles.options} to='/mypage/profile' style={{color:'var(--dark-color)'}}>
                    Profile
                </Link>
                <div className={styles.options} onClick={logoutHandler} style={{color:'var(--alert-color)'}}>
                    Log Out
                </div>
            </div>}
        </div>
    )
}

export default AuthMenu