import { useState } from "react";
import styles from "./Carousel.module.css";
const CarouselItem = ({ index, children }) => {
  const [carouselIndex] = useState(index);
  return (
    <div className={styles.carouselItem} style={{left:`${carouselIndex * 100}%`}}>
      {children}
    </div>
  );
};

export default CarouselItem