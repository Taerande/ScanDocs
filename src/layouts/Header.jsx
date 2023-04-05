import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css'
import { useSelector } from 'react-redux';
import {  useState } from 'react';
import AuthMenu from '../components/layout/AuthMenu';

const Header = () => {
    const [authMenuOpen, setAuthMenuOpen] = useState(false);
    const auth = useSelector(state => state.auth);
    const navigate = useNavigate();
    return (
        <>
            <div className={ styles.container}>
                <div className={styles.header}>
                    <Link to='/'>
                        <div className={styles.logo}>
                                <img src="/icon.svg" alt="log_img" width="64" height="64" />
                                <span>Scan Docs</span>
                        </div>
                    </Link>
                    <div className={styles.auth}>
                        {auth.isLogin ? <div className={styles['auth-btn']} onClick={()=>setAuthMenuOpen(!authMenuOpen)}>{auth.displayName}</div> :
                            <button onClick={() => navigate('/auth')}>Log in</button>}
                        {auth.isLogin && authMenuOpen && <AuthMenu onClose={()=>setAuthMenuOpen(false)}/>}
                    </div>
                </div>
                <div className={styles.menu}>
                    <Link to='/ocr'>OCR</Link>
                    <Link to='/mask'>Mask</Link>
                </div>
            </div>
        </>
    )

}

export default Header;