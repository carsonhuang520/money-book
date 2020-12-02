import './App.css'
import React, {Component, Fragment} from 'react'
import Nav from './components/Nav'
import CreateAccount from './pages/CreateAccount'
import AccountList from './pages/AccountList'
import Report from './pages/Report'
import {Route, withRouter} from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props)
    const pathname = this.props.history.location.pathname
    let nav = 'jizhang'
    if (pathname === '/report') {
      nav = 'report'
    } else if (pathname === '/list') {
      nav = 'detail'
    }
    this.state = {
      type: 'outcome',
      navType: nav
    }
  }

  onClickType = (type) => {
    this.setState({
      type: type
    })
  }

  render() {
    const {type, navType} = this.state
    return (
      <Fragment>
        <Route exact path="/" type={type}
               render={() => <CreateAccount type={type} onClickType={this.onClickType}/>}/>
        <Route path="/list" type={type}
               render={() => <AccountList type={type} onClickType={this.onClickType}/>}/>
        <Route path="/report" type={type}
               render={() => <Report type={type} onClickType={this.onClickType}/>}/>
        <Nav type={navType}/>
      </Fragment>
    )
  }
}

export default withRouter(App)
