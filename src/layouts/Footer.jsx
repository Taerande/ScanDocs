import { Link } from 'react-router-dom';
import styles from './Footer.module.css'
const Footer = () => {
    return <div className={styles.footer}>
        <div className={styles.sitemap}>
            <div className={styles.category}>
                <div>Services</div>
                <Link to="/">Home</Link>
                <Link to="/ocr">OCR</Link>
                <Link to="/scan">SCAN</Link>
            </div>
            <div className={styles.category}>
                <div>Terms & Policies</div>
                <Link to="/term">Terms</Link>
                <Link to="/policy">Policies</Link>
            </div>
            <div className={styles.category}>
                <div>Help</div>
                <Link to="/feat">Feature</Link>
            </div>
            <div>
            </div>
        </div>
        <div className={styles.copyright}>
            <div>
                {`2023 - ${new Date().getFullYear()}`} Scan Docs
            </div>
            <div>
                Contact | <a href="mailto:scandocs.web@gmail.com">scandocs.web@gmail.com</a>
            </div>
        </div>
    </div>

}

export default Footer;