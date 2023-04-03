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
        let xPos;
        if (e.type === 'touchmove') {
            xPos = e.touches[0].clientX-20;
        } else {
            xPos = e.layerX;
        }
        if (!draggable) return
        if(xPos < 20 || xPos > landing.clientWidth - 15) return
        const handle = document.getElementById('handle');
        const before = document.getElementById('before-container');
        const statement = document.getElementById('statement');
        const statement2 = document.getElementById('statement2');
        handle.style.left = xPos - 10 + 'px';
        before.style.width = xPos - 5 + 'px';
        statement.style.background = `linear-gradient(to right, rgba(0,0,0,0) 0% ${xPos - 10 - 50}px, rgba(0,0,0,0) ${xPos - 10 - 50}px ${xPos - 10 + 10 - 50}px, white ${xPos - 10 + 10 - 50}px 100%)`;
        statement.style['-webkit-background-clip'] = 'text';
        statement.style['-webkit-text-fill-color'] = 'transparent';

        statement2.style.background = `linear-gradient(to right, black 0% ${xPos - 10 - 50}px, black ${xPos - 10 - 50}px ${xPos - 10 + 10 - 50}px, rgba(0,0,0,0) ${xPos - 10 + 10 - 50}px 100%)`;
        statement2.style['-webkit-background-clip'] = 'text';
        statement2.style['-webkit-text-fill-color'] = 'transparent';

    }
    const mouseUpHandler = (e) => {
        e.preventDefault();
        setDraggable(false)
    }
    useEffect(() => {
        
        const handle = document.getElementById('handle');
        const landing = document.getElementById('landing');
        // mouse Event
        landing.addEventListener('mousedown', mouseDownHandler)
        landing.addEventListener('mousemove', mouseMoveHandler)
        landing.addEventListener('mouseup', mouseUpHandler)
        landing.addEventListener('mouseleave', mouseUpHandler)
        
        
        // touch Event
        handle.addEventListener('touchstart', mouseDownHandler)
        handle.addEventListener('touchmove', mouseMoveHandler)
        handle.addEventListener('touchend', mouseUpHandler)
        handle.addEventListener('touchcancle', mouseUpHandler)
        
    
        return () => {
            landing.removeEventListener('mousedown',mouseDownHandler)
            landing.removeEventListener('mousemove',mouseMoveHandler)
            landing.removeEventListener('mouseup',mouseUpHandler)
            landing.removeEventListener('mouseleave', mouseUpHandler)
                
            handle.removeEventListener('touchstart', mouseDownHandler)
            handle.removeEventListener('touchmove', mouseMoveHandler)
            handle.removeEventListener('touchend', mouseUpHandler)
            handle.removeEventListener('touchcancle', mouseUpHandler)
        
      }
    }, [draggable])
    
    return (
        <>
            <div id="landing" className={styles['landing-container']}>
                <div id="before-container" className={styles['before-container']}>
                    <img className={styles['scan-before']} src="./after.png" />
                </div>
                <div id="after-container" className={ styles['after-container']}>
                    <img className={styles['scan-after']} src="./before.jpg" />
                </div>
                <div id="handle" className={styles.handle}>
                    <div>
                        <div className={styles.handleIcon}>
                            <img src={rightArrowSvg} width="36" height="36" />
                        </div>
                    </div>
                </div>
                <div id="statement" className={ styles.statement1}>
                    Before
                </div>
                <div id="statement2" className={ styles.statement2}>
                    After
                </div>
                <div className={ styles.statement3 }>
                    Image Processing
                </div>
            </div>
            <div  className={ styles.comment}>&lt; Drag the line from left to right to demonstrate image processing. &gt; </div>
            <p className={ styles.explaination}>
                "Scan Docs" is an Optical Character Recognition (OCR) feature that demonstrates higher accuracy through image post-processing.<br />
                <br />
                First, create a mask on the image for orthogonal projection.<br />
                Secondly, it increases character clarity through Binary Transform.<br />
                <br />
                It also ultimately increases OCR accuracy by extracting only a portion of the image, not the entire image, to enable OCR.
            </p>
        </>)
}
export default Landing