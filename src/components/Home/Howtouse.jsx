import { useNavigate } from 'react-router-dom'
import Carousel from '../ui/Carousel'
import styles from './Howtouse.module.css'


const carouselItem = [
    {
        'text':"1. Click the input area or drag & drop to load a new image.",
        'imgUrl':"./original.JPG",
    },
    {
        'text':"2. Create a mask and set the area to orthogonal projection.",
        'imgUrl':"./masking.JPG",
    },
    {
        'text':"3. Create and position an OCR box on an orthogonal projected image.",
        'imgUrl':"./createRects.JPG",
    },
    {
        'text':"4. Select a language in the separated area below and perform OCR operations. If you don't like it, reset the region and language.",
        'imgUrl':"./mask.JPG",
    },
]

const Howtouse = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <button onClick={()=>{navigate('/ocr')}}>Let's Dive into OCR</button>
            <Carousel item={carouselItem} />
        </div>
    )

}
export default Howtouse