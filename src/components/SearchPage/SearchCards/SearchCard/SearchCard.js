import React from 'react';
import {uniqueId} from 'lodash';
import styles from './SearchCard.css';

export default (props) => {
    //Props: name, artists[], album_art{height, width, url}
    const artists = props.artists;
    const name = props.name;
    const albumArt = props.album_art;

    let s = [styles.container];
    if (props.selected) {
        s.push(styles.active);
    }

    return (
        <li key={uniqueId()} className={s.join(', ')} onClick={() => props.onClick(name, artists[0])}>
            <div className={styles.imageContainer}>
                <img src={albumArt.url} />
            </div>
            <div className={styles.textContainer}>
                <p>{name}</p>
                <h6>{artists.join(', ')}</h6>
            </div>
        </li>
    );




};