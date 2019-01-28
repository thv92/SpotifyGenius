import React from 'react';
import styles from './SearchPage.css';
import QueryString from 'query-string';
import {uniqueId} from 'lodash';
import SearchCard from './SearchCard/SearchCard';

class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "",
            results: null
        };
        this.onUserInput = this.onUserInput.bind(this);
        this.getSongData = this.getSongData.bind(this);
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
        .then((response) => response.json())
        .then((json) => {
            this.setState(() => {
                return {
                    results: json.results
                }
            });
        })
        .catch((err) => {
            this.setState(() => {
                return {
                    results: null
                };
            });
        });
    }


    onSearchCardClicked(name, artist) {
        console.log("Clicked on: " + name + " " + artist);
    }

    render() {
        const results = this.state.results;
        let songsToDisplay = null;
        if (results) {
            songsToDisplay = results.map((result) => {
                //TODO: onclick store primary artist
                return (
                    <SearchCard key={uniqueId()} onClick={this.onSearchCardClicked} {...result}/>
                );
            });
        }

        return (
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.titleContainer}>
                        <h1>Spotify Genius</h1>
                    </div>
                    <div className={styles.searchBarContainer}>
                        <input className={styles.searchBar} type="text" value={this.state.searchTerm} onChange={(e) => {this.onUserInput(e)}} placeholder="Search Song Here..."/>
                    </div>
                    <div className={styles.searchButtonContainer}>
                        <div className={styles.searchButton} onClick={this.getSongData}>Search</div>
                    </div>
                    <div className={styles.results}>{songsToDisplay}</div>
                </div>
                <div className={styles.right}>Right Area</div>
            </div>
        );
    }
}

export default SearchPage;