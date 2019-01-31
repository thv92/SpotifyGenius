import React from 'react';
import styles from './Login.css';

const login = (props) => {
    return (
        <div className={styles.loginContainer}>
            <h1>PLEASE LOGIN</h1>
            <a href={process.env.API + '/login'} className={styles.buttonContainer}>
                <div className={styles.loginButton}>Login</div>
            </a>
        </div>
    );
}

export default login;