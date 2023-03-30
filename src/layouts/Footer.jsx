import styles from './Footer.module.css'
const Footer = () => {
    return <div className={styles.footer}>
        <div className={styles.sitemap}>
            <div className={styles.category}>
                <div>유저정책</div>
                <a>Sign In</a>
                <a>Terms</a>
            </div>
            <div className={styles.category}>
                <div>접근성</div>
                <a>Contact</a>
                <a>How to use</a>
            </div>
        </div>
        <div className={ styles.copyright}>
            { `2023 ~ ${new Date().getFullYear()}` } Scan Docs
            
        </div>
    </div>

}

export default Footer;