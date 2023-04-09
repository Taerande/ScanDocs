import { useEffect, useRef, useState } from "react"
import styles from './Canvas.module.css'
import MaskCanvas from "./Canvas/MaskCanvas";
import MainCanvas from "./Canvas/MainCanvas";
const CanvasContainerForScan = ({changeImg}) => {
    const maskCanvas = useRef(null);
    const mainCanvas = useRef(null);
    const [openMask, setOpenMask] = useState(false);

    const TransformHandler = () => {
        maskCanvas.current.transformImage();
        setOpenMask(false);
        document.getElementById('uploaded-image').src = document.getElementById('result').toDataURL();
    }
    const donwloadHandler = () => {
        const canvas = document.getElementById('main');
        const img = document.getElementById('uploaded-image');
        const imgName = img.name.split('.')[0];
        const link = document.createElement('a');
        link.download = `${imgName}-scan-docs.png`;
        link.href = canvas.toDataURL();
        link.click();
    }
    return (
        <>
            <div className={styles['control-panel']}>
                <button onClick={() => {
                    changeImg();
                }}>New Image</button>
                <button onClick={TransformHandler}>Transform Image</button>
                <button onClick={() => setOpenMask(!openMask)}>make Mask</button>
            </div>
            <div className={styles['canvas-container']} id="canvas-container">
                <MainCanvas ref={mainCanvas}/>
                {openMask && <MaskCanvas ref={maskCanvas} />}
            </div>
            <canvas style={{ display: 'none' }} id='result'></canvas>
            <div className={ styles.donwload }>
                <button className={ styles.ctaBtn } onClick={donwloadHandler}> Download Image </button>
            </div>
        </>
    )

}
export default CanvasContainerForScan