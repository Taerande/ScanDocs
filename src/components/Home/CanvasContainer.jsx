import { useRef, useState } from "react"
import styles from './Canvas.module.css'
import MainCanvas from "./Canvas/MainCanvas";
import MaskCanvas from "./Canvas/MaskCanvas";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
const CanvasContainer = ({changeImg}) => {
    const mainCanvas = useRef(null);
    const maskCanvas = useRef(null);
    const [openMask, setOpenMask] = useState(false);
    const dispatch = useDispatch();
    const TransformHandler = () => {
        if (!openMask) {
            dispatch(uiActions.toggleSnackbar({
                value: true,
                type: 'alert',
                message:'Make mask and select area to transform first.'
            }))
            return
        }
        maskCanvas.current.transformImage();
        setOpenMask(false);
        document.getElementById('uploaded-image').src = document.getElementById('result').toDataURL();
    }
    return (
        <>
            <div className={styles['control-panel']}>
                <button onClick={() => {
                    changeImg();
                }}>New Image</button>
                <button onClick={() => {
                    mainCanvas.current.createRectHandler()
                }}>Create OCR Box</button>
                <button onClick={() => {
                    mainCanvas.current.clearRectHandler()
                }}>Clear Boxes</button>
                <button onClick={TransformHandler}>Transform</button>
                <button onClick={() => setOpenMask(!openMask)}>Make Mask</button>
            </div>
            <div className={ styles['canvas-container']} id="canvas-container">
                <MainCanvas ref={mainCanvas}/>
                {openMask && <MaskCanvas ref={maskCanvas} />}
            </div>
            <canvas style={{display:'none'}} id='result'></canvas>
        </>
    )

}
export default CanvasContainer