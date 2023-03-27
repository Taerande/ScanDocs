import { useEffect, useRef, useState } from "react"
import Canvas from "../components/Home/Canvascopy"
import DragOverMenu from "../potals/DragOverMenu"
import styles from "./Home.module.css"
import LoadingSpinner from '../components/ui/LoadingSpinner'
const Home = () => {
    const filInputRef = useRef();
    const [openDrag, setopenDrag] = useState(false);
    const [imgUrl, setImgUrl] = useState();
    const [imgLoad, setImgLoad] = useState(false);
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
        addEventListener('drop', e => {
            e.preventDefault();
            setopenDrag(false);
        });
        return () => {
        }
    }, []);
    return <>
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
        {imgUrl ? <Canvas changeImg={() => filInputRef.current.click()} /> : <>
            {imgLoad ? <LoadingSpinner /> : <div className={ styles['plz-upload']} onClick={() => filInputRef.current.click()}>
                Click or Drag & Drop <br/>
                Upload Your Image📸
            </div>}
        </>}
    </>
}

export default Home