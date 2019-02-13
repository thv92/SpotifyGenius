import React from 'react';
import SearchPage from '../components/SearchPage/SearchPage';
import styles from './App.css';
import cookie from 'react-cookies';

class App extends React.Component {
    constructor(props) {
        super(props);

        let token = null;
        let cookieState = cookie.load(process.env.STATE);
        if (cookieState) {
            token = cookieState;
            cookie.remove(process.env.STATE)
        }
        this.state = { token };
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
