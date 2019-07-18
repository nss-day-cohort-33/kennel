import React, { Component } from 'react'
import AnimalCard from "../animal/AnimalCard"
import "./employee.css"

export default class EmployeeList extends Component {
  render() {
    return (
      <section className="employees">
        {
          this.props.employees.map(employee =>
            <div key={employee.id} className="card card--employee">
              <div className="card-body">
                <div className="card-title">
                  <img className="icon--employee" />
                  <h5>{employee.name}</h5>
                <a href="#"
                    onClick={() => this.props.deleteEmployee(employee.id)}
                    className="card-link">Delete</a>
                </div>
                <h6 class="card-subtitle mb-2 text-muted">Caretaker For</h6>
                <div className="animals--caretaker">
                {
                  this.props.animals
                    .filter(anml => anml.employeeId === employee.id)
                    .map(anml => <AnimalCard key={anml.id} animal={anml} {...this.props} />)
                }
                </div>
              </div>
            </div>
          )
        }
      </section>
    )
  }
}
