import React, {Component, createContext} from 'react'
import {Route, withRouter} from 'react-router-dom'

import EditCategory from './pages/EditCategory'
import CreateCategory from './pages/CreateCategory'
import QrCode from './components/QrCode'
import Nav from './components/Nav'
import CreateAccount from './pages/CreateAccount'
import AccountList from './pages/AccountList'
import Report from './pages/Report'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.scss'
import {getToken} from './utils'

export const AppContext = createContext()

class App extends Component {
  constructor(props) {
    super(props)
    let nav = this.getNav()
    this.state = {
      type: 'outcome',
      navType: nav,
      categories: [],
      items: [],
      qrCodeVisible: false,
      el: null
    }
    this.actions = {}
  }

  getNav = () => {
    const hash = window.location.hash
    let nav = 'jizhang'
    if (hash === '#/report') {
      nav = 'report'
    } else if (hash === '#/list') {
      nav = 'detail'
    } else if (hash === '#/login') {
      nav = 'login'
    } else if (hash === '#/register') {
      nav = 'register'
    }
    return nav
  }

  componentDidMount() {
    if (document.documentElement.clientWidth > 500) {
      this.setState({
        qrCodeVisible: true
      })
      document.addEventListener('click', (e) => {
        if (e.target.className === 'qrcode-mask') {
          this.setState({
            qrCodeVisible: false
          })
        }
      })
    }
    window.addEventListener('hashchange', () => {
      this.verifyTokenExist()
      this.setState({
        navType: this.getNav()
      })
    })
  }

  verifyTokenExist = () => {
    const token = getToken()
    console.log(token)
    if (!token) {
      this.props.history.push('/login')
    } else {
      if (window.location.hash === '#/login') {
        this.props.history.push('/')
      }
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
    const {type, navType, qrCodeVisible} = this.state
    console.log(navType)
    return (
      <AppContext.Provider value={{state: this.state, actions: this.actions}}>
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
        {qrCodeVisible ? <QrCode/> : null}
        {
          (navType !== 'login' && navType !== 'register') && <Nav type={navType} onClickNav={this.onClickNav}/>
        }
        <Route path="/login" render={() => <Login/>}/>
        <Route path="/register" render={() => <Register/>}/>
      </AppContext.Provider>
    )
  }
}

export default withRouter(App)
