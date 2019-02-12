import React from 'react';
import styles from './Lyrics.css'
import Lyric from './Lyric/Lyric';
import {uniqueId} from 'lodash';

class Lyrics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lyricsToDisplay: this.getLyricsToDisplay(this.props.lyrics)
        };
    }

    getLyricsToDisplay(lyrics) {
        return lyrics.map((lyric) => {
            return (
                <Lyric key={uniqueId()} lyricObj={lyric}/>
            );
        });
    }
    componentDidUpdate(prevProps) {
        let prevLyrics = prevProps.lyrics;
        let nextLyrics = this.props.lyrics;

        if (prevLyrics.length !== nextLyrics.length || 
            prevLyrics.find((lyric, index) => {
                return lyric.lyric !== nextLyrics[index].lyric;
            })) 
        {
            this.setState(() => {
                return {
                    lyricsToDisplay: this.getLyricsToDisplay(this.props.lyrics)
                };
            });
        }
    }


    render() {
       return (
           <div className={styles.lyricsSection}>
               {this.state.lyricsToDisplay[this.props.active]}
           </div>
       );
   };
}



export default Lyrics;