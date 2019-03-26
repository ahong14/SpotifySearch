const express = require('express');
const request = require('request');
const querystring = require('querystring');
const router = express.Router();
const apiValues = require('../config/spotify.json')

//referred to Spotify OAuth documentation https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow

//spotify OAuth info
const apiURL = "https://accounts.spotify.com/api/token";
const clientID = apiValues.clientID;
const clientSecret = apiValues.clientSecret;
const redirectURI = apiValues.redirectURI;

//callback route after authentication
router.get('/', (req, res) => {
    //authentication code retrieved after logging in
    var apiCode = req.query.code;

    //generate request parameters
    var requestParams = {
        form:{
            grant_type: "authorization_code",
            code: apiCode,
            redirect_uri: redirectURI
        },

        //bas64 encoded 
        headers: {
            Authorization: 'Basic ' + new Buffer(clientID + ':' + clientSecret).toString('base64')
        },

        json: true
    }

    //generate post request to obtain access token for API usage
    request.post(apiURL, requestParams, (err, resp, body) => {
        if(err){
            console.error("error: ", error);
            return res.status(400).send("error with access token");
        }

        //obtain access and refresh tokens
        const accessToken = body.access_token;
        const refreshToken = body.refresh_token;

        var tokens = {
            access: accessToken,
            refreshToken: refreshToken
        };

        //create query string parameters, access tokens from URL
        var queries = querystring.stringify(tokens);
        var redirectURL = '/home?' + queries;
        return res.status(200).redirect(redirectURL);
    })
});

module.exports = router;