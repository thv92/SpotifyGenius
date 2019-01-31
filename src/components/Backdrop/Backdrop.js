import React from 'react';
import styles from './Backdrop.css';


const backdrop = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.modal}>
                {props.children}
            </div>
            <div className={styles.background}></div>
        </div>    
    );
};


export default backdrop;




