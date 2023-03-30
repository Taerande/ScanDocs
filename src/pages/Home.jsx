import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styles from './Home.module.css'
const Home = () => {
    const [draggable, setDraggable] = useState(false);
    const mouseDownHandler = (e) => {
        e.preventDefault();
        if (e.target.id !== 'handle') return
        setDraggable(true);

    }
    const mouseMoveHandler = (e) => {
        e.preventDefault();
        const landing = document.getElementById('landing');
        if (!draggable) return
        if(e.clientX < 50 || e.clientX > landing.clientWidth) return
        const handle = document.getElementById('handle');
        const before = document.getElementById('before-container');
        handle.style.left = e.clientX - 18 - 8 + 'px';
        before.style.width = e.clientX -18 + 'px';

    }
    const mouseUpHandler = (e) => {
        setDraggable(false)

    }
    useEffect(() => {
        const landing = document.getElementById('landing');
        landing.addEventListener('mousedown', mouseDownHandler)
        landing.addEventListener('mousemove', mouseMoveHandler)
        landing.addEventListener('mouseup', mouseUpHandler)
    
        return () => {
          landing.removeEventListener('mousedown',mouseDownHandler)
          landing.removeEventListener('mousemove',mouseMoveHandler)
          landing.removeEventListener('mouseup',mouseUpHandler)
        
      }
    }, [draggable])
    
    return (
        <>
            <div id="landing" className={styles['landing-container']}>
                <div id="before-container" className={styles['before-container']}>
                    <img className={styles['scan-before']} src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"/>
                </div>
                <div id="after-container" className={ styles['after-container']}>
                    <img className={styles['scan-after']} src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
                </div>
                <div id="handle" className={styles.handle}>
                    <div></div>
                </div>
            </div>
                {/* Landing Imagese and Click To action to ocr page */}
                <Link to="/ocr">to Ocr</Link>
            <div>
                Free to Use, No Limit, Edit Image
            </div>
            <div>
                    howto use it carousel
            </div>
        </>)
}
export default Home