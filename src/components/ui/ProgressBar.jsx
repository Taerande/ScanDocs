import styles from './ProgressBar.module.css'

const ProgressBar = ({ value, statement }) => {
    const realStatement = () => {
        if(value === 100 && statement === 'recognizing text'){
            return 'compelete'
        } else {
            return statement
        }
    }
    return (
        <div className={styles.container}>
            <progress className={styles.progress} id="progress" value={value ?? 0} min="0" max="100">
            </progress>
            <div className={styles.statement}>{realStatement()}</div>
        </div>
    );
}
export default ProgressBar