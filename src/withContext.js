import React from 'react'
import {AppContext} from './App'

const withContext = (Component) => {
  return ((props) => {
    return (<AppContext.Consumer>{
      ({state}) => {
        return <Component {...props} data={state}/>
      }
    }</AppContext.Consumer>)
  })
}

export default withContext