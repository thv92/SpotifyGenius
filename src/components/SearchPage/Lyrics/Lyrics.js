import React from 'react';
import styles from './Lyrics.css';
import {uniqueId} from 'lodash';
import Lyric from './Lyric/Lyric';

class Lyrics extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {

        if (nextProps.lyrics.length !== this.props.lyrics.length) {
            return true;
        } else {
            let changed = false;
            this.props.lyrics.forEach((lyric, index) => {
                const nextLyric = nextProps.lyrics[index];
                if (nextLyric !== lyric) {
                    changed = true;
                    return;
                }
            });
            return changed;
        }
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