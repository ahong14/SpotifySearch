import React, { Component } from 'react';
import './AlbumResult.css';
import defaultAlbum from '../../defaultAlbum.png';

//Component to display search result of albums
class AlbumResult extends Component{
    render(){
        return(
            <div className = "card searchCard col-md-3">
                <img className = "card-img top resultImage" src = {this.props.imgSrc} alt = "music image result"/>
                <div className = "card-body cardContent">
                    <p id = "name" className = "card-text text-center">  <strong> Name: </strong> {this.props.name}  </p>
                    <p id = "artist" className = "card-text text-center"> <strong> Artist: </strong> {this.props.artistName} </p> 
                    <p id = "releaseDate" className = "card-text text-center"> <strong> Release Date: </strong> {this.props.releaseDate} </p>
                    <p id = "tracks" className = "card-text text-center"> <strong> Total Tracks: </strong> {this.props.totalTracks} </p>
                </div>
            </div>
        );
    }
}

//default prop values
//search results will override with corresponding values
AlbumResult.defaultProps = {
    name: 'Not Provided',
    artistName: 'Not Provided',
    releaseDate: 'Not Provided',
    totalTracks: "1",
    imgSrc: defaultAlbum
}

export default AlbumResult;
