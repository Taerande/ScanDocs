import styles from './Header.module.css'
const Header = () => {
    return (
        <>
            <div className={styles.header}>
                <div className={styles.logo}>logo section</div>
                <div className={styles.auth}>authSection</div>
            </div>
            <div className={styles.menu}>
                <div>OCR</div>
                <div>Mask</div>
            </div>
        </>
    )

}

export default Header;