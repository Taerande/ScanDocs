import { useEffect, useRef, useState } from "react"
import CanvasContainerForScan from "../components/Home/CanvasContainerForScan"
import DragOverMenu from "../potals/DragOverMenu"
import styles from "./OcrPage.module.css"
import LoadingSpinner from '../components/ui/LoadingSpinner'
const ScanPage = () => {
    const [opencvLoaded, setOpencvLaoded] = useState(true);
    const filInputRef = useRef();
    const [openDrag, setopenDrag] = useState(false);
    const [imgUrl, setImgUrl] = useState();
    const [imgLoad, setImgLoad] = useState(false);

    // import opencv
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
    }, [])
    
    const handleDrop = (event) => {
        setImgLoad(true);
        event.preventDefault();
        setImgUrl(null);
        let file;
        if (event.type === 'drop') {
            file = event.dataTransfer.files[0];
        } else if (event.type === 'change') {
            file = event.target.files[0];
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = document.getElementById('uploaded-image');
            img.setAttribute('name',file.name);
            setImgUrl(event.target.result);
            setImgLoad(false);
        };
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
        <img id="uploaded-image" src={imgUrl} style={{ display: 'none' }} />
        <input type="file"  accept="image/*" ref={filInputRef} style={{display:'none'}} onChange={handleDrop} />
        
        {openDrag && <DragOverMenu onClose={() => setopenDrag(false)}>
            <div className={styles['back-drop']}>
                <div className={styles['upload-container']} id="upload-image">
                    📸 Upload Your Image
                </div>
            </div>
        </DragOverMenu>}

        {imgUrl ? <CanvasContainerForScan changeImg={() => filInputRef.current.click()} /> : <>
            {!imgLoad ? <>
                <div className={styles['plz-upload']} onClick={() => filInputRef.current.click()}>
                <div className={ styles['upload-message']}>
                    <div style={{ color: 'var(--info-color)', fontSize:'3rem', fontWeight:900 }}>
                        SCAN
                    </div>
                    <div>
                        Upload Your Image📸
                    </div>
                    <div className={ styles.method}>
                        Click, Drag & Drop
                    </div>
                </div>
                </div></> : <LoadingSpinner width={8} size={50} color={"alert"} />}
        
        </>}
    </>
}

export default ScanPage