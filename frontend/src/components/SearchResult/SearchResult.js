import React, { Component } from 'react';
import './SearchResult.css';
import defaultImage from '../../defaultAvatar.jpg';

//Component that stores artist search result info
class SearchResult extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div id = "searchCard" className = "card">
                <img className = "card-img top resultImage" src = {this.props.imgSrc} alt = "music image result"/>
                <div className = "card-body cardContent">
                    <div id = "artists">
                        <p className = "card-text text-center"> <a href = {this.props.artistLink} target = "_blank">  {this.props.name} </a> </p> 
                    </div>
                    <p className = "card-text text-center"> <strong> Popularity: </strong> {this.props.popularity} </p>
                    <p className = "card-text text-center"> <strong> Genre: </strong> {this.props.genre} </p>
                </div>
            </div>
        );
    }
}

//default values of search result
SearchResult.defaultProps = {
    name:'Not Provided',
    popularity: '0',
    genre: "None Listed",
    imgSrc: defaultImage
}

export default SearchResult;
