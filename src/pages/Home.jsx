import { useNavigate } from 'react-router-dom'
import Features from "../components/Home/Features"
import Howtouse from "../components/Home/Howtouse"
import Landing from "../components/Home/Landing"
import styles from './Home.module.css'

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <p className={styles.title}>What is Scan Docs ?</p>
            <Landing />
            <p className={styles.title}>Features</p>
            <Features />
            <p className={ styles.cta }>
                <button className={ styles.ctaBtn } onClick={()=>{navigate('/ocr')}}>Let's Dive into OCR</button>
            </p>
            <p className={styles.title}>How to Use it</p>
            <Howtouse />
        </div>)
}
export default Home