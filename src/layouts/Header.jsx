import { Link } from 'react-router-dom';
import styles from './Header.module.css'
const Header = () => {
    return (
        <>
            <div className={ styles.container}>
                <div className={styles.header}>
                    <div className={styles.logo}>logo section</div>
                    <div className={styles.auth}>
                        <button>Log in</button>
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