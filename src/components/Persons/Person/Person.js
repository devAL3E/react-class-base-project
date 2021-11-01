import React, { Component } from 'react'
import personClasses from './Person.css'
import Auxiliary from '../../../hoc/Auxiliary'
import withDivClassName from '../../../hoc/withDivClassName'
import PropTypes from 'prop-types'
import AuthContext from '../../../context/auth-context'

class Person extends Component {

    // const rnd = Math.random();
    // if ( rnd > 0.7 ) {
    //     throw new Error( 'Something went wrong' );
    // }

    constructor(props) {
        super(props)
        this.inputElementRef = React.createRef()
    } 

    static contextType = AuthContext

    render() {
        console.log('[Person.js] rendering...')

        return (
            <Auxiliary>
                { this.context.authenticated ? <p>Authenticated!</p> : <p>Please Log in</p> }
                <p onClick={this.props.click}>I'm {this.props.name} 'n I'm {this.props.age} years old</p>
                <p> {this.props.children} </p>
                <input
                    //ref={(inputEl) => {this.inputElement = inputEl}}
                    ref={this.inputElementRef}
                    type="text"
                    onChange={this.props.changed}
                    value={this.props.name} />
            </Auxiliary>
        )
    }

    componentDidMount() {
        //this.inputElement.focus()
        this.inputElementRef.current.focus()
        console.log(this.context.authenticated)
    }

}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
}

export default withDivClassName(Person, personClasses.Person) 