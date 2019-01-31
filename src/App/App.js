import React from 'react';
import SearchPage from '../components/SearchPage/SearchPage';
import Login from '../components/Login/Login';
import Backdrop from '../components/Backdrop/Backdrop';
import styles from './App.css';



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false
        };
    }

    render() {
        return (
            <main>
                { !this.state.login ? <Backdrop><Login /></Backdrop> : null }
                <SearchPage />
            </main>
        );
    }
}

export default App;
