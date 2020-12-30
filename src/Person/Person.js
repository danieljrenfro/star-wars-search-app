import React, { Component } from 'react';

import './Person.css';

class Person extends Component {
  render() {
    return(
      <li className="person">
        <h3 className="name">{this.props.details.name}</h3>
        <ul className="person-details">
          <li className="detail"><b>Gender:</b> {this.props.details.gender}</li>
          <li className="detail"><b>Hair Color:</b> {this.props.details.hair_color}</li>
          <li className="detail"><b>Skin Color:</b> {this.props.details.skin_color}</li>
          <li className="detail"><b>Birth Year:</b> {this.props.details.birth_year}</li>
        </ul>
      </li>
    )
  }
}

export default Person;