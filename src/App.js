import './App.css'
import React, {Component, Fragment} from 'react'
import Nav from './components/Nav'
import CreateAccount from './pages/CreateAccount'
import AccountList from './pages/AccountList'
import Report from './pages/Report'
import {Route, withRouter} from 'react-router-dom'
import EditCategory from './pages/EditCategory'
import CreateCategory from './pages/CreateCategory'

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

  onClickNav = (type) => {
    this.setState({
      navType: type
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
        <Route path="/editCategory" type={type}
               render={() => <EditCategory type={type} onClickType={this.onClickType}/>}/>
        <Route path="/addCategory" type={type}
               render={() => <CreateCategory type={type} onClickType={this.onClickType}/>}/>
        <Nav type={navType} onClickNav={this.onClickNav}/>
      </Fragment>
    )
  }
}

export default withRouter(App)
