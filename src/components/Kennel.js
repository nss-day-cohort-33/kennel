import React, { Component } from 'react'
import EmployeeList from "./employee/EmployeeList"
import "./kennel.css"

export default class Kennel extends Component {
  /*
        Although you will eventually be pulling your objects
        from your json-server API, for this chapter, we're
        faking it and just creating those arrays in the component
        itself
    */
  employeesFromAPI = [
    { id: 1, name: "Jessica Buzzkill" },
    { id: 2, name: "Jordan Nelson" },
    { id: 3, name: "Zoe LeBlanc" },
    { id: 4, name: "Blaise Roberts" }
  ]

  // This will eventually get pulled from the API
  locationsFromAPI = [
      { id: 1, name: "Nashville North", address: "500 Circle Way" },
      { id: 2, name: "Nashville South", address: "10101 Binary Court" }
  ]

  state = {
    employees: this.employeesFromAPI,
    locations: this.locationsFromAPI
  }

  render() {
    return (
      <article>
        <h3>Student Kennels</h3>
        <h4>Nashville North Location</h4>
        <h5>500 Puppy Way</h5>
        <EmployeeList employees={this.state.employees} foo="bar"/>
      </article>
    );
  }
}
