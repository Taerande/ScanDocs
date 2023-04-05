import { useRef ,useEffect, useState } from 'react'
import styles from './AuthMenu.module.css'
import { logout } from '../../firebase/firebase';
import { Link, useNavigate } from 'react-router-dom';
const AuthMenu = ({ onClose }) => {
    const navigate = useNavigate();
    const authMenuRef = useRef(null);
    const [fade, setFade] = useState();
    useEffect(() => {
        const handleClickOutside = (event) => {
            let fadeTimer;
            if (!authMenuRef.current.contains(event.target)) {
                setFade(true);
                if (fadeTimer) {
                    clearTimeout(fadeTimer);
                }
                fadeTimer = setTimeout(() => {
                    onClose();
                }, 200);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const logoutHandler = () => {
        logout().then((res) => {
            navigate('/');
        }).catch((er) => {
        })
    }
    return (
        <div ref={authMenuRef} className={`${styles.container} ${fade ? styles['fade-out'] : styles['fade-in']}`}>
            <div className={ styles.optionTitle }>
                Options
            </div>
            <hr />
            <Link className={styles.options} to='/mypage'>
                Mypage
            </Link>
            <Link className={styles.options} to='/mypage/mask'>
                Mask
            </Link>
            <Link className={styles.options} to='/mypage/profile'>
                Profile
            </Link>
            <div className={ styles.options} onClick={logoutHandler}>
                Log Out
            </div>
        </div>
    )
}

export default AuthMenu