import styles from './ControlPanel.module.css'
const ControlPanel = ({addNewRect, clearRect, changeImg, addNewMask}) => {
    return (
        <div className={styles.panel}>
            <button onClick={addNewRect}>Rect 생성</button>
            <button onClick={addNewMask}>Mask 생성</button>
            <button onClick={changeImg}>새로운 이미지로 변경하기</button>
            <button onClick={clearRect}>모든 Rect 지우기</button>
        </div>
    )
}
export default ControlPanel