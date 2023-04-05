import styles from './Auth.module.css'
import Input from "../components/ui/Input";
import { getAuth } from "../firebase/firebase"
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Auth = () => {
    const [authLoading, setAuthLoading] = useState(false);
    const navigate = useNavigate();

    const loginHandler = (e) => {
        e.preventDefault();
        setAuthLoading(!authLoading)
        getAuth(e.target.email.value, e.target.password.value).then(() => {
            navigate('/');
        }).catch(() => {
            // error 처리
        });
    }
    return (
        <>
            <div className={styles.container}>
                <div className={styles.welcome}>
                    "Welcome! Please log in to enjoy more of Scan Docs."
                </div>
                <form onSubmit={loginHandler}>
                    <Input type='text' name="email" placeholder="Enter email" required={true} />
                    <Input type='password' name="password" placeholder="Enter password" required={true} />
                    <button disabled={authLoading} type='submit' className={styles.submitBtn}>
                        {authLoading ? <LoadingSpinner color="info" /> : <span>Log In</span>}
                    </button>
                </form>
                <div className={styles.signup}>
                    
                    Don't have an account? <Link to='/register'>Sign up</Link>
                </div>
            </div>
        </>
    )

}
export default Auth