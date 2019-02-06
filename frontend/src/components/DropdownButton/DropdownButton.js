import React, { Component } from 'react';
import './DropdownButton.css';

//Component to toggle ascending/descending to sort popularity
class DropdownButton extends Component{

    constructor(props){
        super(props);
        this.state = {
            //store current sorting mehtod
            sort: this.props.sortMethod
        }
        this.toggleSort = this.toggleSort.bind(this);
    }

    //toggle ascending/descending text value
    toggleSort(){
        if(this.state.sort === "Ascending"){
            this.setState({
                sort: "Descending"
            })
        }

        else{
            this.setState({
                sort: "Ascending"
            })
        }

        //update parent component of changed sort method of popularity
        this.props.updateSort();
    }

    render(){
        return(
            <button className="btn btn-primary btn-md" id = "toggle" type="button" onClick = {this.toggleSort}>
                Sort by popularity for artists: {this.state.sort}
            </button> 
        );
    }
}

export default DropdownButton;
