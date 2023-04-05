import { Link } from 'react-router-dom';
import styles from './Footer.module.css'
const Footer = () => {
    return <div className={styles.footer}>
        <div className={styles.sitemap}>
            <div className={styles.category}>
                <div>Services</div>
                <Link to="/">Home</Link>
                <Link to="/ocr">OCR</Link>
                <Link to="/ocr">Mask</Link>
            </div>
            <div className={styles.category}>
                <div>Policy</div>
                <a>Terms</a>
            </div>
            <div className={styles.category}>
                <div>Help</div>
                <Link to="/contact">Contact</Link>
                <Link to="/howtouse">How to Use</Link>
            </div>
        </div>
        <div className={ styles.copyright}>
            { `2023 ~ ${new Date().getFullYear()}` } Scan Docs
            
        </div>
    </div>

}

export default Footer;