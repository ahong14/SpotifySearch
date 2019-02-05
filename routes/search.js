const express = require('express');
const request = require('request');
const querystring = require('querystring');

var searchURL = "https://api.spotify.com/v1/search?";

const router = express.Router();
router.get('/', (req,res) => {
    //extract access token from request in cookie
    const accessToken = req.query.access;
    
    //generate request to Spotify API
    const authParams = {
        headers:{'Authorization': 'Bearer ' + accessToken},
        json: true
    }

    //query parameters to pass to search API
    var queryParams = {
        q: '',
        type: ''
    };

    //extract params from search on client
    var searchArtist = req.query.artist;
    var searchAlbum = req.query.album;

    //check to determine if searching by artist, album, or both

    //empty search queries, return error
    if(searchArtist.trim() === '' && searchAlbum.trim() === ''){
        return res.json({
            status:false,
            message: "Please enter search queries"
        });
    }

    //search only artist
    else if(searchArtist.trim() != '' && searchAlbum.trim() === ''){
        queryParams.q = searchArtist;
        queryParams.type = "artist";
    }

    //search only album
    else if(searchArtist.trim() === '' && searchAlbum.trim() != ''){
        queryParams.q = searchAlbum;
        queryParams.type = "album";
    }

    //search album names with artist in name
    else{
        queryParams.q = "album:" + searchAlbum + " artist:" + searchArtist;
        queryParams.type = "album"
    }

    //create query string, append to search url
    var queries = querystring.stringify(queryParams);

    //send search queries to spotify api
    request.get(searchURL + queries, authParams, (err,resp,body) => {
        if(err){
            console.err(err);
            return res.status(400).send("error with params")
        }

        return res.status(200).json({
            status:true,
            result: body
        });
    })
})

module.exports = router;