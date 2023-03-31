import React, { useEffect, useRef, useState } from "react";
import styles from "./Carousel.module.css";
import CarouselItem from "./CarouselItem";
const Carousel = ({ children }) => {
    const containerRef = useRef(null);
    const [carouselIndex, setCarouselIndex] = useState(0);

    const handlePrevClick = () => {
        setCarouselIndex(carouselIndex - 1);
    };

    const handleNextClick = () => {
        setCarouselIndex(carouselIndex + 1);
    };

    const handleShortcutClick = (index) => {
        setCarouselIndex(index);
    };
    useEffect(() => {
        const carousel = containerRef.current;
        carousel.style.transform = `translate(-${carouselIndex*100}%)`;

    },[carouselIndex])

  return (
    <div className={styles.carousel}>
      <div className={styles.carouselContainer} ref={containerRef}>
        {children.map((child, index) => (
            <CarouselItem key={index} index={index}>
            {child}
            </CarouselItem>
        ))}
      </div>
          <div className={styles.controller}>
              <div className={styles.prevNext}>
                <button
            className={styles.prevButton}
            onClick={handlePrevClick}
            disabled={carouselIndex === 0}
            >
            &lt;
            </button>
            <button
            className={styles.nextButton}
            onClick={handleNextClick}
            disabled={carouselIndex === children.length - 1}
            >
            &gt;
            </button>
              </div>
              <div className={ styles.shortchut}>
            {children.map((child, index) => (
            <button
                key={index}
                className={
                carouselIndex === index ? styles.shortcutButtonActive : styles.shortcutButton
                }
                onClick={() => handleShortcutClick(index)}
            />
            ))}
            </div>
      </div>
    </div>
  );
};

export default Carousel;
