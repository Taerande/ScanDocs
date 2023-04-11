import styles from './Feat.module.css'
const Feat = () => {
    return (
        <>
            <div>
                <div className={styles.title}>
                    About Scan Docs
                </div>
                <p className={styles.comment}>
                    Welcome to "Scan Docs," a powerful, user-friendly OCR program that runs directly from a web browser. Using open-source technologies including opencv and tesseract, this web-based OCR program offers a range of features and benefits that make it an excellent choice for anyone who wants to convert images and scanned documents into editable text.
                </p>
                <p className={styles.comment}>
                    One of the key benefits of "ScanDocs" is that you don't need a backend. This makes it a convenient and cost-effective solution for anyone looking for simple and effective OCR tools. "Scan Docs" allows you to quickly and easily convert images and scanned documents into text without the need for complex software or hardware.
                </p>
                <p className={styles.comment}>
                    Key features and benefits of "ScanDocs" include high accuracy, a user-friendly interface, and compatibility with various web browsers. "Scan Documents" makes it easy to convert scanned documents into editable text, making it easy to edit and manipulate text as needed.
                </p>
                <p className={styles.comment}>
                    Overall, "Scan Docs" is an excellent choice for anyone looking for powerful, easy-to-use OCR programs that can be used directly in a web browser. With the use of open source technology, the absence of a backend and a user-friendly interface, "Scan Docs" is the best choice for anyone looking for a cost-effective and efficient OCR solution.
                </p>
            </div>
            <div>
                <div className={styles.title}>
                    Open Sources
                </div>
                <div className={styles.opensources}>
                    <a href="https://opencv.org/" target="_blank" rel="noopener noreferrer">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/3/32/OpenCV_Logo_with_text_svg_version.svg" width="100" alt="opencv_logo" />
                    </a>
                    <div className={styles.tesseract}>
                        <a href="https://github.com/tesseract-ocr" target="_blank" rel="noopener noreferrer">
                        <img src="https://github.com/naptha/tesseract.js/raw/master/docs/images/tesseract.png" width="90" alt="tesseract_logo" />
                        </a>
                        <div className={ styles.opensourceText}>
                            Tesseract.js
                        </div>
                    </div>
                </div>
                <div className={styles.license}>
                    <a href="https://www.apache.org/licenses/LICENSE-2.0" target="_blank" rel="noopener noreferrer">License : Apache2</a>
                </div>
            </div>
        </>
    )

}
export default Feat