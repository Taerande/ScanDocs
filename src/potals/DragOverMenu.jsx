import styles from './DragOverMenu.module.css'
import ReactDOM from 'react-dom'
import { useEffect } from 'react'

const Backdrop = props => {
    return <div className={styles.backdrop} onClick={ props.onClose } ></div>
}

const Content = props => {
    return (<div className={styles.modal}>
        <div className={styles.content}>{props.children}</div>

    </div>)
}
const portalElement = document.getElementById('overlays');

const DragOverMenu = (props) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.removeProperty('overflow');
        }
    },[])
    return (<>
        {ReactDOM.createPortal(<Backdrop onClose={ props.onClose } />, portalElement)}
        {ReactDOM.createPortal(<Content>{ props.children }</Content>,portalElement)}
    </>)

}

export default DragOverMenu