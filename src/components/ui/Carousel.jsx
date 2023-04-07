import { useEffect, useRef, useState } from 'react'
import styles from './Carousel.module.css'

const Carousel = ({ item }) => {
    const carouselRef = useRef(null);
    const containerRef = useRef(null);
    const [selectedIdx, setSelectedIdx] = useState(0);
     const setCarouselHeight = () => {
        const images = document.querySelectorAll('img');
        const hwotouseImgs = Array.from(images).filter(img => img.alt === 'howtouse_image');

        const tallestImg = hwotouseImgs.reduce((prev, current) => {
        return prev.height > current.height ? prev : current;
        });
        containerRef.current.style.height = tallestImg.height + 50 + 'px';
    }
    useEffect(() => {
        addEventListener('resize', setCarouselHeight);
        
        return () => {
            removeEventListener('load', setCarouselHeight);
        }
    }, []);
    

    const nextBtn = () => {
        if(selectedIdx > item.length - 2) return
        carouselRef.current.style.left = `${-(selectedIdx +1)* 100}%`;
        setSelectedIdx(prev => prev + 1);
    }
    const prevBtn = () => {
        if(selectedIdx < 1) return
        carouselRef.current.style.left = `${-(selectedIdx-1) * 100}%`;
        setSelectedIdx(prev => prev - 1);
    }
    const shortcut = (idx) => {
        carouselRef.current.style.left = `${-idx* 100}%`;
        setSelectedIdx(idx);
    }
    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.carousel} ref={carouselRef}>
                {item.map((v, index) => {
                    return (<div key={index} className={styles['carousel-item']} style={{ left: `${index * 100}%` }}>
                        <div>
                            <div className={ styles.statement}>{ v.text }</div>
                            <img onLoad={setCarouselHeight} src={v.imgUrl} alt="howtouse_image" className={ styles.image }/>
                        </div>
                    </div>)
                })}
            </div>
            <button className={ styles.nextBtn } disabled={selectedIdx === item.length - 1} onClick={nextBtn}>&gt;</button>
            <button className={ styles.prevBtn } disabled={selectedIdx === 0} onClick={prevBtn}>&lt;</button>
            <div className={styles.dots}>
                {item.map((v, idx) => {
                    return (
                        <div key={idx} onClick={() => { shortcut(idx) }} className={ `${styles.dot} ${idx===selectedIdx ? styles.activated : '' }`}></div>)
                })}
            </div>
        </div>
    )

}
export default Carousel