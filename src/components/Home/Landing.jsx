import { useEffect, useState } from "react"
import styles from './Landing.module.css'
import rightArrowSvg from '@/assets/svgs/right-arrow.svg'
const Landing = () => {
    const [draggable, setDraggable] = useState(false);
    const mouseDownHandler = (e) => {
        e.preventDefault();
        if (e.target.id !== 'handle') return
        setDraggable(true);

    }
    const mouseMoveHandler = (e) => {
        const landing = document.getElementById('landing');
        if (!draggable) return
        if(e.layerX < 20 || e.layerX > landing.clientWidth - 20) return
        const handle = document.getElementById('handle');
        const before = document.getElementById('before-container');
        handle.style.left = e.layerX - 10 + 'px';
        before.style.width = e.layerX - 5 + 'px';

    }
    const mouseUpHandler = (e) => {
        e.preventDefault();
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
                    <div>
                        <div className={styles.handleIcon}>
                            <img src={rightArrowSvg} width="36" height="36" />
                        </div>
                    </div>
                </div>
                <div className={ styles.statement}>
                    Grap and scan it
                </div>
            </div>
        </>)
}
export default Landing