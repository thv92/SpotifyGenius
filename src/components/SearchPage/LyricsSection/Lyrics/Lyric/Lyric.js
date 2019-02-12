import React from 'react';
import { uniqueId } from 'lodash';
import styles from './Lyric.css';

const lyric = (props) => {
    //props: lyric => String
    const formattedLyric = props.lyricObj.lyric.split('\n').map((line) => {
        return <span key={uniqueId()}>{line}<br/></span>;
    });

    return (
        <React.Fragment>
            <div className={styles.lyricContainer}>
                <p className={styles.lyric}>{formattedLyric}</p>
            </div>
        </React.Fragment>
    );
};


export default lyric;