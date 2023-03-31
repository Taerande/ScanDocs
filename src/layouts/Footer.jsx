import { Link } from 'react-router-dom';
import styles from './Footer.module.css'
const Footer = () => {
    return <div className={styles.footer}>
        <div className={styles.sitemap}>
            <div className={styles.category}>
                <div>Products</div>
                <Link to="/">Home</Link>
                <Link to="/ocr">OCR</Link>
            </div>
            <div className={styles.category}>
                <div>Policy</div>
                <a>Sign In</a>
                <a>Terms</a>
            </div>
            <div className={styles.category}>
                <div>Accessability</div>
                <Link to="/contact">Contact</Link>
                <a>How to use</a>
            </div>
        </div>
        <div className={ styles.copyright}>
            { `2023 ~ ${new Date().getFullYear()}` } Scan Docs
            
        </div>
    </div>

}

export default Footer;