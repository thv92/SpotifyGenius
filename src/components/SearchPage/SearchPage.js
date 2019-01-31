import React from 'react';
import styles from './SearchPage.css';
import QueryString from 'query-string';
import SearchCards from './SearchCards/SearchCards';
import Lyrics from './Lyrics/Lyrics';
import {uniqueId} from 'lodash';

class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "",
            songData: null,
            lyricsData: null
        };
        this.onUserInput = this.onUserInput.bind(this);
        this.getSongData = this.getSongData.bind(this);
        this.getLyrics = this.getLyrics.bind(this);
        this.onEnterPressed = this.onEnterPressed.bind(this);
        this.onSearchButtonClicked = this.onSearchButtonClicked.bind(this);
        this.onSearchCardClicked = this.onSearchCardClicked.bind(this);

    }

    onUserInput(e) {
        let value = e.target.value;
        this.setState((state, props) => {
            return {
                searchTerm: value
            };
        });
    }

    getSongData() {
        fetch(process.env.API + '/search/song?' + QueryString.stringify({
            q: this.state.searchTerm
        }))
        .then(response => response.json())
        .then(json => {
            this.setState(() => {
                return {
                    songData: json.results
                }
            });
        })
        .catch((err) => {
            this.setState(() => {
                return {
                    songData: null
                };
            });
        });
    }

    getLyrics(name, artist) {
        fetch(process.env.API + '/search/lyric?' + QueryString.stringify({
            name,
            artist
        }))
        .then(response => response.json())
        .then(json => {
            console.log(json);
            this.setState(() => {
                return {
                    lyricsData: json.lyrics
                };
            });
        })
        .catch(err => {
            this.setState(() => {
                return {
                    lyricsData: null
                };
            });
        })


    }

    onEnterPressed(e) {
        const key = e.key;
        if (key === 'Enter') {
            this.getSongData();
        }
    }

    onSearchButtonClicked() {
        this.getSongData();
    }

    onSearchCardClicked(name, artist) {
        this.getLyrics(name, artist);
    }


    render() {
        const songData = this.state.songData;
        const lyricsData = this.state.lyricsData;
        let songsToDisplay = null;
        let lyricsToDisplay = null;
        if (songData) {
            songsToDisplay = <SearchCards songs={songData} onClick={this.onSearchCardClicked} />;
        }
        if (lyricsData && lyricsData.length !== 0) {
            lyricsToDisplay = <Lyrics lyrics={lyricsData}/>
        }

        return (
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.titleContainer}>
                        <h1>Spotify Genius</h1>
                    </div>
                    <div className={styles.searchBarContainer}>
                        <input className={styles.searchBar} type="text" value={this.state.searchTerm} onChange={(e) => {this.onUserInput(e)}} onKeyDown={this.onEnterPressed} placeholder="Search Song Here..." />
                    </div>
                    <div className={styles.searchButtonContainer}>
                        <div className={styles.searchButton} onClick={this.onSearchButtonClicked}>Search</div>
                    </div>
                    {songsToDisplay}
                </div>
                <div className={styles.right}>
                    {lyricsToDisplay}
                </div>
            </div>
        );
    }
}

export default SearchPage;