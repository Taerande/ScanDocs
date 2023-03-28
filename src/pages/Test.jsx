import { useEffect, useRef, useState } from "react"
import MainCanvas from "../components/Home/Canvas/MainCanvas"
import MaskCanvas from "../components/Home/Canvas/MaskCanvas"
import styles from './Test.module.css'

const Test = () => {
    const mainCanvas = useRef(null);
    const [imgLoaded, setImageLoaded] = useState(false);
    const [openMask, setOpenMask] = useState(false);
    return (
        <div>
            <img id="target" src="./invoice.png" style={{ display: 'none' }} alt="" onLoad={() => setImageLoaded(true)} />
            <div>
                <button onClick={() => {
                    mainCanvas.current.createRectHandler()
                }}>create rect</button>
                <button onClick={() => {
                    mainCanvas.current.clearRectHandler()
                }}>clear rect</button>
                <button onClick={() => setOpenMask(!openMask)}>make Mask</button>
            </div>
            <div className={ styles['canvas-container']}>
                {imgLoaded && <MainCanvas
                    ref={mainCanvas}
                />}
                {imgLoaded && openMask && <MaskCanvas />}
            </div>
        </div>
    )

}
export default Test