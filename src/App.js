import React, { Component } from 'react';

import './App.css';
import Person from './Person/Person';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      searchTerm: {
        value: '',
        touched: false
      }
    }
  }

  requestUrl = () => {
    const searchTerm = this.state.searchTerm.value;

    let requestUrl = 'https://swapi-thinkful.herokuapp.com/api/people/';
    requestUrl += '?search=' + searchTerm;

    console.log('request url', requestUrl);
    return requestUrl;
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.getSearchResults();
    this.resetSearchForm();
  }

  getSearchResults = () => {
    fetch(this.requestUrl())
      .then(response => {
        if (!response.ok) {
          throw new Error('Something went wrong')
        } 
        return response.json();
      })
      .then(data => {
        this.populateSearchResults(data.results);
      })
  }

  updateSearchTerm = (userInput) => {
    this.setState({ 
      searchTerm: {
        value: userInput,
        touched: true
      }
    })
  }

  updateSearchFrom = (userSelection) => {
    this.setState({
      searchFrom: {
        value: userSelection,
        touched: true
      }
    })
  }

  populateSearchResults = (results) => {
    this.setState({
      searchResults: results
    })
  }

  resetSearchForm = () => {
    this.setState({
      searchTerm: {
        value: '',
        touched: false
      },
      searchFrom: {
        value: '',
        touched: false
      }
    })
  }
  
  render() {
    const people = this.state.searchResults.map(result => {
      return <Person details={result}/>
    })

    return (
      <div className="App">
        <header className="App-header">
          <h1>Star Wars Search App</h1>
        </header>
  
        <form onSubmit={(e) => this.handleFormSubmit(e)} className="search-form">
          <label htmlFor="search">Search People:</label>
          <input onChange={(e) => this.updateSearchTerm(e.target.value)} name="search" id="search" required value={this.state.searchTerm.value}/>
          <button className="search-btn" type="submit">Search</button>
        </form>

        {this.state.searchResults.length !== 0 && <h2 className="results-header">Results:</h2>}
        <ul className="people-list">
          {people}
        </ul>
      </div>
    );
  }
}

export default App;
