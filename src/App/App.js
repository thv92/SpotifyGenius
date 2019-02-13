import React from 'react';
import SearchPage from '../components/SearchPage/SearchPage';
import styles from './App.css';
import QueryString from 'query-string';

class App extends React.Component {
    constructor(props) {
        super(props);
        let parsedUrl = QueryString.parse(window.location.search);
        this.state = { token: parsedUrl.t };
    }

    render() {
        return (
            <main>
                <SearchPage {...this.state}/>
            </main>
        );
    }
}

export default App;
