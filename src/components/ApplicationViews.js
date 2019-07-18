import { Route, Redirect } from 'react-router-dom'
import React, { Component } from "react"
import { withRouter } from 'react-router'
import LocationList from './location/LocationList'
import AnimalList from './animal/AnimalList'
import EmployeeList from './employee/EmployeeList'
import AnimalDetail from './animal/AnimalDetail'
import AnimalForm from './animal/AnimalForm'
import Login from './authentication/Login'
import AnimalManager from "../modules/AnimalManager"

class ApplicationViews extends Component {
    state = {
        employees: [],
        locations: [],
        animals: []
    }

    componentDidMount() {
      const newState = {}

      AnimalManager.getAll()
        .then(animals => newState.animals = animals)
        .then(() => fetch("http://localhost:5002/employees")
        .then(r => r.json()))
        .then(employees => newState.employees = employees)
        .then(() => this.setState(newState))
    }

    // Check if credentials are in local storage
    isAuthenticated = () => sessionStorage.getItem("credentials") !== null

    deleteAnimal = (id) => {
      return fetch(`http://localhost:5002/animals/${id}`, {
          method: "DELETE"
      })
      .then(AnimalManager.getAll)
      .then(animals => {
          this.props.history.push("/animals")
          console.log("history?", this.props.history)
          this.setState({ animals: animals })
      })
    }

    addAnimal = (animal) =>
      AnimalManager.post(animal)
      .then(() => AnimalManager.getAll())
      .then(animals =>
        this.setState({
          animals: animals
        })
      );

    render() {
      console.log("Component was rendered");
        return (
          <React.Fragment>
            <Route exact path="/" render={(props) => {
                return <LocationList locations={this.state.locations} />
            }} />
            <Route exact path="/animals" render={(props) => {
                return <AnimalList {...props} deleteAnimal={this.deleteAnimal} animals={this.state.animals} />
            }} />
            <Route path="/animals/:taco(\d+)" render={(props) => {
              // Find the animal with the id of the route parameter
              let animal = this.state.animals.find(animal =>
                  animal.id === parseInt(props.match.params.taco)
              )
              // If the animal wasn't found, create a default one
              if (!animal) {
                  animal = {id:404, name:"404", breed: "Dog not found"}
              }

              return <AnimalDetail dischargeAnimal={this.deleteAnimal} animal={animal} />
            }} />
            <Route path="/animals/new" render={(props) => {
              return <AnimalForm
                {...props}
                addAnimal={this.addAnimal}
                employees={this.state.employees} />
            }} />
            <Route path="/employees" render={(props) => {
                if (this.isAuthenticated()) {
                  return <EmployeeList deleteEmployee={this.deleteEmployee}
                  employees={this.state.employees} />
                } else {
                    return <Redirect to="/login" />
                }
            }} />
            <Route path="/login" component={Login} />
          </React.Fragment>
        )
    }
}

export default withRouter(ApplicationViews)
