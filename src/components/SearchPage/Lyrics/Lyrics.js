import React from 'react';
import styles from './Lyrics.css';
import {uniqueId} from 'lodash';
import Lyric from './Lyric/Lyric';

const lyrics = (props) => {
    //props: lyrics
    const lyricsToDisplay = props.lyrics.map((lyric) => {
        return (
            <Lyric key={uniqueId()} lyric={lyric}/>
        );
    });

    return (
        <div className={styles.lyricsSection}>
            {lyricsToDisplay}
        </div>
    );


}


export default lyrics