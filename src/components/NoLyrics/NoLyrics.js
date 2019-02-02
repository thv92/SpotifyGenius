import React from 'react';
import styles from './NoLyrics.css';



export default () => {
    return (
        <div className={styles.container}>
            <div className={styles.messageContainer}>
                <h2>No Lyrics Could Be Found For This Song</h2>
            </div>
        </div>
    );
}
