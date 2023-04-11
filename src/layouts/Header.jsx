import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Header.module.css'
import { useSelector } from 'react-redux';
import {  useState } from 'react';
import AuthMenu from '../components/layout/AuthMenu';
const Header = () => {
    const auth = useSelector(state => state.auth);
    const navigate = useNavigate();
    return (
        <>
            <div className={ styles.container}>
                <div className={styles.header}>
                    <NavLink to='/'>
                        <div className={styles.logo}>
                                <img src="/icon.svg" alt="log_img" width="64" height="64" />
                                <span>Scan Docs</span>
                        </div>
                    </NavLink>
                    <div>
                        {auth.isLogin ? <AuthMenu onClose={() => setAuthMenuOpen(false)} auth={auth} /> :
                            <button onClick={() => navigate('/auth')}>Log in</button>}
                    </div>
                </div>
                <div className={styles.menu}>
                    <NavLink className={({ isActive }) => (isActive ? styles.active : '')} to='/ocr'>OCR</NavLink>
                    <NavLink className={({ isActive }) => (isActive ? styles.active : '')} to='/scan'>SCAN</NavLink>
                </div>
            </div>
        </>
    )

}

export default Header;