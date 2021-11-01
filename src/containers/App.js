import React, { Component } from 'react'
import appClasses from './App.css'
import Persons from '../components/Persons/Persons'
import Cockpit from '../components/Cockpit/Cockpit'
import WithClass from '../hoc/WithClass'
import AuthContext from '../context/auth-context'

class App extends Component {
  constructor(props) {
    super(props)
    console.log('[App.js] Constructor')
  }

  state = {
    persons: [
      {id: "qew", name: "Ariel", age: 25},
      {id: "asd", name: "Tamy", age: 33},
      {id: "zxc", name: "Me", age: 33}
    ],
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  }

  static getDerivedStateFromProps (props, state) {
    console.log('[App.js] getDerivedStateFromProps', props)
    return state
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate')
    return true
  }

  switchNameHandler = (newName) => {
    // console.log("Was clicked")
    // DON'T DO THIS: this.state.persons[0].name = "Ari"
    this.setState({
      persons: [
        {name: newName, age: 25},
        {name: "Tamy", age: 33},
        {name: "Me", age: 32}
      ]
    })
  }

  changedNameHandler = (event, id) => {

    const personIndex = this.state.persons.findIndex(p => p.id === id)

    const person = {...this.state.persons[personIndex]}

    person.name = event.target.value

    const persons = [...this.state.persons]

    persons[personIndex] = person

    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1
      }
    })

  }

  deletePersonHandler = personIndex => {
    // const persons = this.state.persons.slice()
    const persons = [...this.state.persons]
    persons.splice(personIndex, 1)
    this.setState({persons: persons})
  }

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons
    this.setState({showPersons: !doesShow})
  }

  loginHandler = () => {
    this.setState({authenticated: true})
  }

  render() {

    console.log('[App.js] render')

    let persons = null

    if (this.state.showPersons) {
      persons = (
        <div>
          <Persons 
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.changedNameHandler}
            isAuthenticated={this.state.authenticated} />
        </div>
      )
      
    }

    let cockpitBtnCaption = 'Hide Cockpit'

    if (!this.state.showCockpit) {
      cockpitBtnCaption = 'Show Cockpit'
    } else {
      cockpitBtnCaption = 'Hide Cockpit'
    }

    return (
      <WithClass classes={appClasses.App}>
        <button onClick={() => {this.setState({showCockpit: !this.state.showCockpit})}}>
          {cockpitBtnCaption}
        </button>
        <AuthContext.Provider
          value={{
            authenticated: this.state.authenticated,
            login: this.loginHandler
          }}
        >
          {this.state.showCockpit && <Cockpit
            title={this.props.appTitle}
            showPersons={this.state.showPersons}
            personsLength={this.state.persons.length}
            clicked={this.togglePersonHandler} />}
          {persons}
        </AuthContext.Provider>
      </WithClass>
    )
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'React App JSX way'))
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount')
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('[App.js] componentDidUpdate')
  }

}

export default App
