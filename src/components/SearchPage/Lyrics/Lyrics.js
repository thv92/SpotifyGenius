import React from 'react';
import styles from './Lyrics.css';
import {uniqueId} from 'lodash';
import Lyric from './Lyric/Lyric';

class Lyrics extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.lyrics.length !== this.props.lyrics.length) {
            return true;
        } else {
            this.props.lyrics.forEach((lyric, index) => {
                const nextLyric = nextProps.lyrics[index];
                if (nextLyric !== lyric) {
                    return true;
                }
            });
        }
        return false;
    }
    
    render() {
        //props: lyrics
        const lyricsToDisplay = this.props.lyrics.map((lyric) => {
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

}


export default Lyrics;