import Input from '../components/ui/Input';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { registerNewUser } from '../firebase/firebase';
import styles from './Register.module.css'
import { useState } from "react"

const Register = () => {
    const [registerLoading, setRegisterLoading] = useState(false);
    const registerHandler = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const password_check = e.target['password check'].value;
        if(password !== password_check) return
        const displayName = e.target['Display name'].value;
        registerNewUser(email, password, displayName);
    }
    return (
         <>
            <div className={styles.container}>
                <h2 className={styles.welcome}>
                    "Join our community and unlock the full potential of Scan Docs."
                </h2>
                <form onSubmit={registerHandler}>
                    <Input type='text' name="email" placeholder="Enter email" required={true} />
                    <Input type='text' name="Display name" placeholder="Enter Display name" required={true} />
                    <Input type='password' name="password" placeholder="Enter password" required={true} />
                    <Input type='password' name="password check" placeholder="Enter password check" required={true} />
                    <button disabled={registerLoading} type='submit' className={styles.submitBtn}>
                        {registerLoading ? <LoadingSpinner color="info" /> : <span>Register</span>}
                    </button>
                </form>
            </div>
        </>
    )
}
export default Register