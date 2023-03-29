import { useEffect, useRef, useState } from "react"
import styles from './Canvas.module.css'
import MainCanvas from "./Canvas/MainCanvas";
import MaskCanvas from "./Canvas/MaskCanvas";
const Canvas = () => {
    const mainCanvas = useRef(null);
    const maskCanvas = useRef(null);
    const [openMask, setOpenMask] = useState(false);
    return (
        <div>
            <div>
                <button onClick={() => {
                    mainCanvas.current.createRectHandler()
                }}>create rect</button>
                <button onClick={() => {
                    mainCanvas.current.clearRectHandler()
                }}>clear rect</button>
                <button onClick={() => {
                    maskCanvas.current.transformImage();
                    setOpenMask(false);
                    document.getElementById('uploaded-image').src = document.getElementById('result').toDataURL();
                }}>transform Image</button>
                <button onClick={() => setOpenMask(!openMask)}>make Mask</button>
            </div>
            <div className={ styles['canvas-container']}>
                <MainCanvas ref={mainCanvas}/>
                {openMask && <MaskCanvas ref={maskCanvas} />}
            </div>
            <canvas style={{display:'none'}} id='result'></canvas>
        </div>
    )

}
export default Canvas