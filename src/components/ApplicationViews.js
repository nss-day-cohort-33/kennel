import { Route } from 'react-router-dom'
import React, { Component } from "react"
import LocationList from './location/LocationList'
import AnimalList from './animal/AnimalList'
import EmployeeList from './employee/EmployeeList'

const url = "http://localhost:5002/"

export default class ApplicationViews extends Component {
    state = {
        employees: [],
        locations: [],
        animals: []
    }

    componentDidMount(){
      const newState = {}

      fetch(`${url}animals`)
        .then(r => r.json())
        .then(animals => newState.animals = animals)
        .then(() => fetch("http://localhost:5002/employees")
        .then(r => r.json()))
        .then(employees => newState.employees = employees)
        .then(() => this.setState(newState))
    }

    render() {
      console.log("Component was rendered");
        return (
            <React.Fragment>
                <Route exact path="/" render={(props) => {
                    return <LocationList locations={this.state.locations} />
                }} />
                <Route path="/animals" render={(props) => {
                    return <AnimalList animals={this.state.animals} />
                }} />
                <Route path="/employees" render={(props) => {
                    return <EmployeeList employees={this.state.employees} />
                }} />
            </React.Fragment>
        )
    }
}
