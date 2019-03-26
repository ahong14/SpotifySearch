import React, { Component } from 'react';
import './Home.css';
import axios from 'axios';
import queryString from 'query-string';
import Results from '../Results/Results';

//Component that contains search fields and results
class Home extends Component{

    //constructor, set state of component
    constructor(props){
        super(props);

        //state to keep track of artist,album input values
        this.state = {
            //keep track of search queries
            artist: '',
            album: '',
            //keep track of access and refresh tokens
            accessToken:'',
            refreshToken: '',
            //array of search results
            searchResults: []
        };

        //bind function to component
        this.changeSearchValue = this.changeSearchValue.bind(this);
        this.searchQueries = this.searchQueries.bind(this);
        this.handlePress = this.handlePress.bind(this);
    }

    //change search value on each key change
    changeSearchValue(){
        this.setState({
            artist: this.artistInput.value,
            album: this.albumInput.value
        });
    }

    //onclick function to search results using spotify API
    searchQueries(){
        //send GET request to API
        //params include artist, album, and access token
        axios.get('/api/search', {
            params: {
                artist: this.state.artist,
                album: this.state.album,
                access: this.state.accessToken
            }
        }).then(res => {
            if(res.data.status === false){
                alert(res.data.message);
            }

            else{
                //extract data from API response
                var albumResults = res.data.result.albums;
                var artistResults = res.data.result.artists;

                if(artistResults === undefined && albumResults.items.length === 0 || albumResults === undefined && artistResults.items.length === 0){
                    alert("No Matching Results");
                }

                //returned list of albums, save results and clear search queries
                else if(albumResults != undefined && artistResults === undefined){
                    this.setState({
                        searchResults: albumResults.items,
                        artist: '',
                        album: ''
                    });
                    console.log(this.state.searchResults);
                }

                //returned list of artists, save results and clear search queries
                else if(artistResults != undefined && albumResults === undefined){
                    this.setState({
                        searchResults: artistResults.items,
                        artist: '',
                        album: ''
                    });
                    console.log(this.state.searchResults);
                }
            }
        })
        .catch(err => {
            console.log(err);
            alert(err);
        })
    }

    //handle search by pressing enter key
    handlePress(event){
        if(event.key === 'Enter'){
            console.log("enter was pressed");
            event.preventDefault();
            this.searchQueries();
        }
    };

    //save access and refresh token after authorizing and mounting to DOM
    componentDidMount(){
        //parse URL and extract access/refresh token
        var queryParams = queryString.parse(this.props.location.search);
        this.setState({
            accessToken: queryParams.access,
            refreshToken: queryParams.refreshToken
        });

        //attach event listener to determine if enter key was pressed
        const artistElement = this.refs.forms;
        const addEvent = artistElement.addEventListener;
        addEvent("keypress", this.handlePress, false);
    }

    render(){
        return(
            <div className = "container-fluid homeContent" >
                <div className = "container-fluid header">
                    <div id = "headerContent">
                        <h1 className = "text-center"> Spotify Search</h1>
                    </div>
                </div>

                <div id = "inputs" ref = "forms">
                    <form>  
                        <input className = "form-control" ref = {artist => this.artistInput = artist} placeholder = "Artist" onChange = {this.changeSearchValue} autoComplete = "off"/> 
                    </form>

                    <form>
                        <input className = "form-control" ref = {album => this.albumInput = album} placeholder = "Album" onChange = {this.changeSearchValue} autoComplete = "off"/>
                    </form>
                </div>

                <button id = "searchButton" type="button" className="btn btn-primary btn-lg" onClick = {this.searchQueries}> Search </button>

                <Results results = {this.state.searchResults}/>
            </div>
        );
    }
}

export default Home;
