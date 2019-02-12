import React from 'react';
import styles from './LyricsSection.css';
import {uniqueId} from 'lodash';
import Lyrics from './Lyrics/Lyrics';
import NoLyrics from '../../NoLyrics/NoLyrics';

class LyricsSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 0
        };
        this.onNavClicked = this.onNavClicked.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.showNoLyrics) {
            return true;
        } else if (nextState.active !== this.state.active) {
            return true;
        } else if (nextProps.lyrics.length !== this.props.lyrics.length) {
            return true;
        } else {
            let changed = this.props.lyrics.find((lyric, index) => {
                const nextLyric = nextProps.lyrics[index];
                return nextLyric.lyric !== lyric.lyric;
            });
            return changed ? true : false;
        }
    }

    componentDidUpdate(prevProps) {
        let prevLyrics = prevProps.lyrics;
        let currentLyrics = this.props.lyrics;
        if (prevLyrics.length !== currentLyrics.length || 
            currentLyrics.find((lyric, index) => {
            const prevLyric = prevLyrics[index];
            return prevLyric.lyric !== lyric.lyric;
        })) 
        {
            this.setState(() =>{
                return {
                    active: 0
                };
            });
        }
    }
    
    onNavClicked(index) {
        this.setState(() => {
            return {
                active: index
            };
        });
    }

    render() {
        //props: lyrics | type, typeInfo, lyric
        let lyricsLength = this.props.lyrics.length;
        let navItems = null;
        let display = null;
        if (this.props.showNoLyrics) {
            display = <NoLyrics />;
        } else if (lyricsLength > 0) {
            let active = this.state.active;
            if (lyricsLength > 1) {
                navItems = this.props.lyrics.map((lyric, index) => {
                    let liStyle = [styles.navItem];
                    if (active === index) {
                        liStyle.push(styles.activeNavItem);
                    }
                    return(<li key={uniqueId()} className={liStyle.join(' ')} onClick={() => this.onNavClicked(index)}>{lyric.typeInfo}</li>);
                });
            }

            display = (
                <div className={styles.lyricsContainer}>
                    {lyricsLength > 1 ? (<div className={styles.navigationSection}>
                        <ul className={styles.navList}>{navItems}</ul>
                    </div>) : null}
                    <Lyrics active={this.state.active} lyrics={this.props.lyrics}/>
                </div>
            );
        } 
        return (
            <React.Fragment>
                {display}
            </React.Fragment>
        );
    }

}


export default LyricsSection;