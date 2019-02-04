# Spotify Genius

An app created with React served by Express that gets lyrics for a song upon user request. It does this by fetching data from an API wrapper. The API wrapper requires the user to authenticate with the Spotify Account Services. It uses the query to search for songs via the Spotify API and pulls lyrics given the song title and artist from the genius API. This project did not use create-react-app because I wanted to suffer through the process of setting up the project from scratch.

Deployed on heroku: https://spotify-genius.herokuapp.com/


![Site](https://gyazo.com/c45f38900cdac44ac41bf22b13f0cfc8.gif)

## Setup

### Development:
```
yarn buildDev && yarn startServerWDS
```
* buildDev bundles the project via webpack with the dev configuration.
* startServerWDS starts the webpack development server.
    * Make sure to set up the proxy settings inside the webpack dev config with appropriate URL and set API_URL environment url to correct API endpoint

### Production:
```
yarn build && yarn start
```

### Prerequisites

```
node 11.4.0

yarn 1.3.0
```

