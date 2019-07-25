import React, { Component } from 'react'
import AnimalCard from "./AnimalCard"
import "./animal.css"

export default class AnimalList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="animalButton">
          <button type="button"
                  className="btn btn-success"
                  onClick={() => {
                      this.props.history.push("/animals/new")}
                  }>
              Admit Animal
          </button>
        </div>
        <section className="animals">
        {
          this.props.animals.map(animal => {
            return <AnimalCard key={animal.id} animal={animal} {...this.props} />
        })
        }
        </section>
      </React.Fragment>
    )
  }
}
