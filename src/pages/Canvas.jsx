import { useEffect, useRef, useState } from "react"
import CanvasContainer from "../components/Home/Canvas"
import DragOverMenu from "../potals/DragOverMenu"
import styles from "./Canvas.module.css"
import LoadingSpinner from '../components/ui/LoadingSpinner'
const Canvas = () => {
    const [opencvLoaded, setOpencvLaoded] = useState(true);
    const filInputRef = useRef();
    const [openDrag, setopenDrag] = useState(false);
    const [imgUrl, setImgUrl] = useState();
    const [imgLoad, setImgLoad] = useState(false);
    useEffect(() => {
        if (document.querySelector('script[src="https://docs.opencv.org/4.5.5/opencv.js"]')) {
            return;
        }
        setOpencvLaoded(false);
        const script = document.createElement('script');
        script.src = "https://docs.opencv.org/4.5.5/opencv.js";
        script.async = true;
        document.body.appendChild(script);
        setOpencvLaoded(true);
    },[])
    const handleDrop = async (event) => {
        event.preventDefault();
        setImgUrl(null);
        setImgLoad(true);
        let file;
        if (event.type === 'drop') {
            file = event.dataTransfer.files[0];
        } else if (event.type === 'change') {
            file = event.target.files[0];
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            setImgUrl(event.target.result);
        };
        reader.readAsDataURL(file);
    };
    useEffect(() => {
        if(imgUrl) return
        addEventListener('dragover', e => {
            e.preventDefault();
            setopenDrag(true);
                const uploadContainer = document.getElementById('upload-image');
                if (uploadContainer) {
                    uploadContainer.addEventListener('drop', event => {
                        event.preventDefault();
                        setopenDrag(false);
                        handleDrop(event);
                    });
                }
        });
        addEventListener('mouseout', e => {
            setopenDrag(false);
        })
        addEventListener('drop', e => {
            e.preventDefault();
            setopenDrag(false);
        });
        return () => {
        }
    }, [imgUrl]);
    return <>
        {!opencvLoaded && <DragOverMenu>
            <div className={styles['opencv-loader-backdrop']}>
                <div className={ styles['opencv-loader-content']}>
                    <LoadingSpinner color="success" size="36" width="4" />
                    <div className={styles['opencv-loader-message'] }>Loading openCV... You must online.</div>
                </div>
            </div>
        </DragOverMenu>}
        <img className="image-responsive"
            id="uploaded-image" src={imgUrl} style={{ display: 'none' }} />
        <input type="file"  accept="image/*" ref={filInputRef} style={{display:'none'}} onChange={handleDrop} />
        
        {openDrag && <DragOverMenu onClose={() => setopenDrag(false)}>
            <div className={styles['back-drop']}>
                <div className={styles['upload-container']} id="upload-image">
                    📸 Upload Your Image
                </div>
            </div>
        </DragOverMenu>}
        {imgUrl ? <CanvasContainer changeImg={() => filInputRef.current.click()} /> : <>
            {imgLoad ? <LoadingSpinner /> : <div className={ styles['plz-upload']} onClick={() => filInputRef.current.click()}>
                Click or Drag & Drop <br/>
                Upload Your Image📸
            </div>}
        </>}
    </>
}

export default Canvas