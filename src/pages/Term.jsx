import styles from './Feat.module.css'
const Term = () => {
    return (
        <div>
            <div className={styles.title}>
                Term
            </div>
            <p style={{fontSize:'18px', fontWeight:'700'
            }}>
                Membership Information Collection and Processing
            </p>
            <p>
                1.1. This website collects email and password for the purpose of user registration. Email will be used solely for the purpose of service utilization.
            </p>
            <p>
                1.2. Member information and data will be used solely for the purpose of storing personal data for individual use, and this website will not provide member information to third parties.
            </p>
            <p>
                1.3. Members are responsible for securely managing their own personal information and should not disclose their password or provide it to third parties.
            </p>
            <p>
                1.4. Members shall not infringe upon the rights of others or engage in illegal activities while using the services of this website.
            </p>
        </div>
    )

}
export default Term