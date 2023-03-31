import styles from './Features.module.css'
import freeSvg from '@/assets/svgs/free.svg';
import infiniteSvg from '@/assets/svgs/infinity.svg';
import editImgSvg from '@/assets/svgs/edit-image.svg';
const Features = () => {
    return (
        <div className={styles.container}>
            <div>
                <div className={ styles.features }>
                    <img src={freeSvg} width="48" height="48"></img>
                    <span>No Cost</span>
                </div>
                <div>
                    ScanDocs is built from Opencv, Tesserct, so no backend computing resources were used.
                </div>
            </div>
            <div>
                <div className={ styles.features }>
                    <img src={infiniteSvg} width="48" height="48"></img>
                    <span>No Limits</span>
                </div>
                <div>
                    Scan Docs works in a browser environment and uses only client computer resources.
                </div>
            </div>
            <div>
                <div className={ styles.features }>
                    <img src={editImgSvg} width="48" height="48"></img>
                    <span>Can Edit Image</span>
                </div>
                <div>
                    You can edit images and set up OCR zones to get more accurate results.
                </div>
            </div>
        </div>
    )

}
export default Features