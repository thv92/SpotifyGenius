import React from 'react';
import styles from './Login.css';

const login = (props) => {
    return (
        <div className={styles.loginContainer}>
            <h3>PLEASE LOGIN TO SPOTIFY</h3>
            <a href={process.env.API_URL + '/login'} className={styles.buttonContainer}>
                <div className={styles.loginButton} onClick={props.onClick}>Login</div>
            </a>
        </div>
    );
}

export default login;