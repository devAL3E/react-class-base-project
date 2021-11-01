import React, { useEffect, useRef, useContext } from 'react'
import cockpitClasses from './Cockpit.css'
import AuthContext from '../../context/auth-context'

const Cockpit = props => {

  const toggleBtnRef = useRef(null)
  const authContext = useContext(AuthContext)

  console.log(authContext.authenticated)

  useEffect(() => {
    console.log('[Cockpit.js] useEffect')
    // HTTP Request
    // const timer = setTimeout(() => {
    //   alert('Saved data to the cloud!')
    // }, 1000)
    toggleBtnRef.current.click()
    return () => {
      // clearTimeout(timer)
      console.log('[Cockpit.js] cleanup work in useEffect')
    }
  }, [])

  useEffect(() => {
    console.log('[Cockpit.js] 2nd useEffect')
    return () => {
      console.log('[Cockpit.js] cleanup work in 2nd useEffect')
    }
  })

  const classes = []
  if (props.personsLength <= 2) {
    classes.push(cockpitClasses.red)
  }
  if (props.personsLength <= 1) {
    classes.push(cockpitClasses.bold)
  }

  let btnClass = ''
  if (props.showPersons) {
      btnClass = cockpitClasses.Red
  }

  return (
      <div className={cockpitClasses.Cockpit}>
          <h1>{props.title}</h1>
          <p className={classes.join(' ')}>List of Persons</p>
          <button
            ref={toggleBtnRef}
            className={btnClass}
            onClick={props.clicked}
          >
            Toggle Persons
          </button>
          <button onClick={authContext.login}>Log in</button>
      </div>
  )
}

export default React.memo(Cockpit)