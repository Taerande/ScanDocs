import styles from './Input.module.css'
const Input = ({ type, value, onChange, name, placeholder, required }) => {
    return (
        <div className={ styles['input-container']}>
            <input className={styles['input']} type={type} name={name} id={name} required={required} />
            <label htmlFor={name}>{ placeholder }</label>
        </div>
    )

}
export default Input