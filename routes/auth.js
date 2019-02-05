const express = require('express');
const router = express.Router();
const apiValues = require('../config/spotify.json')

//spotify OAuth
const clientID = apiValues.clientID;
const clientSecret = apiValues.clientSecret;
const redirectURI = apiValues.redirectURI;

//spotify auth
const spotifyURL = "https://accounts.spotify.com/authorize";
const scopes = 'user-read-private user-read-email';

//sign in with Spotify credentials to access Spotify API
router.get('/', (req, res) => {
    //construct authentication link
    var authLink = spotifyURL + '?response_type=code' + '&client_id=' + clientID +  '&scope=' + encodeURIComponent(scopes)
        + '&redirect_uri=' + encodeURIComponent(redirectURI);
        
    //redirect user to authenticate Spotify account using OAuth
    return res.redirect(authLink);
})
module.exports = router;