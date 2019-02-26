import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      term: ''
    }

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);

  }

  search() {
    console.log("Term: ", this.state.term);
    this.props.onSearch(this.state.term);
  }

  handleTermChange(event) {
    console.log('this shouldbe the term: ', event.target.value);
    this.setState({term: event.target.value});
    console.log('this is the term: ', this.state.term)
  }

  render() {
    return(
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
