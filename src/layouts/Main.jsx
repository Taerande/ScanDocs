import { useNavigate } from 'react-router-dom';
import styles from './Main.module.css'
import { useEffect } from 'react';
const Main = (props) => {
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
        return () => {
        
        }
    }, [navigate]);
    return <div className={styles.main} id="main-layout">
        {props.children}
    </div>
}
export default Main;