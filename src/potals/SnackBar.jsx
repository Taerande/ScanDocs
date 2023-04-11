import styles from './Snackbar.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ReactDOM from 'react-dom'
import { uiActions } from '../store/ui-slice';
const Snackbar = () => {
    const showSnackbarData = useSelector(state => state.ui.snackbar);
    const dispatch = useDispatch();
    useEffect(() => {
        setTimeout(() => {
            dispatch(uiActions.toggleSnackbar({value:false, message:'',type:''}));
        }, 2000);
    },[])
    
    const toggleSnackbarHandler = () => {
        dispatch(uiActions.toggleSnackbar({value:false, message:'',type:''}));
    };
    const Content = props => {
        return (
            <div className={styles.snackbar} style={{color:`var(--${showSnackbarData.snackbarType}-color)`}}>
            <div className={styles.contentBox}>
                <div className={styles.message}>{ showSnackbarData.snackbarMessage }</div>
            </div>
        </div>
        )
    }
    const portalElement = document.getElementById('snackbar');
    return (
        <>
            {ReactDOM.createPortal(<Content/>,portalElement)}
        </>
    )

}

export default Snackbar