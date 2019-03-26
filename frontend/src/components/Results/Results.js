import React, { Component } from 'react';
import './Results.css';
import SearchResult from '../SearchResult/SearchResult';
import EmptySearch from '../EmptySearch/EmptySearch';
import AlbumResult from '../AlbumResult/AlbumResult';
import DropdownButton from '../DropdownButton/DropdownButton';

//Component that handles search results
class Results extends Component{
    constructor(props){
        super(props);
        //state consists of search results and ordering method
        this.state ={
            searchResults: this.props.results,
            orderResults: "Descending"
        }
        //bind functions
        this.changeSortResults = this.changeSortResults.bind(this);
        this.descendingSort = this.descendingSort.bind(this);
        this.ascendingSort = this.ascendingSort.bind(this);
    }

    //sort artists results by popularity in ascending order
    ascendingSort(a,b) {
        if (a.popularity < b.popularity)
          return -1;
        if (a.popularity > b.popularity)
          return 1;
        return 0;
    }

    //sort artists results by popularity in descending order
    descendingSort(a,b) {
        if (a.popularity < b.popularity)
          return 1;
        if (a.popularity > b.popularity)
          return -1;
        return 0;
    }

    //toggle sort method when user clicks button
    changeSortResults(){
        if(this.state.orderResults === "Ascending"){
            this.setState({
                orderResults: "Descending"
            })
        }

        else{
            this.setState({
                orderResults: "Ascending"
            })
        }
    }

    render(){
        var renderResults;
        //if no search was made, display empty results
        if(this.props.results.length === 0){
            renderResults = <EmptySearch/>
        }

        else{
            //sort results based on popularity
            if(this.state.orderResults === "Descending"){
                this.props.results.sort(this.descendingSort);
            }

            else if(this.state.orderResults === "Ascending"){
                this.props.results.sort(this.ascendingSort);
            }

            //render results
            renderResults = this.props.results.map(result => {
                //render artists
                if(result.type === "artist"){
                    //returned list of genres is in lower case, "hip hop"
                    var artistGenre = result.genres[0];

                    //function to convert lower case string to tile case "Hip Hop"
                    //referenced https://stackoverflow.com/questions/4878756/how-to-capitalize-first-letter-of-each-word-like-a-2-word-city
                    if(artistGenre != undefined){
                        artistGenre = artistGenre.split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
                    }

                    //if there is an image for an artist and genre list
                    if(result.images[0] != undefined && artistGenre != undefined){
                        return <SearchResult key = {result.id} imgSrc = {result.images[0].url} artistLink = {result.external_urls.spotify} name = {result.name} genre = {artistGenre} popularity = {result.popularity}/>
                    }
                    //if no image for artist, use default image
                    else{
                        return <SearchResult key = {result.id} artistLink = {result.external_urls.spotify} name = {result.name} popularity = {result.popularity}/>
                    }
                }

                //render albums
                else if(result.type === "album"){
                    //if there is an image for an album
                    if(result.images[0] != undefined){
                        return <AlbumResult key = {result.id} imgSrc = {result.images[0].url} artistName = {result.artists[0].name} name = {result.name} releaseDate = {result.release_date} totalTracks = {result.total_tracks}/>
                    }
                    //if there is no image for an album, use default image
                    else{
                        return <AlbumResult key = {result.id} artistName = {result.artists[0].name} name = {result.name} releaseDate = {result.release_date} totalTracks = {result.total_tracks}/>
                    }
                }
            });
        }
        
        return(
            <div className = "container-fluid searchResults">
                <h1 id = "resultList"> <u> Results List </u> </h1>
                <DropdownButton updateSort = {this.changeSortResults} sortMethod = {this.state.orderResults}/>
                <div className = "row" id  = "displayResults"> 
                    {renderResults}
                </div>
            </div>
        );
    }
}

export default Results;
