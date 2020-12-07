import React, {Component, createContext} from 'react'
import Nav from './components/Nav'
import CreateAccount from './pages/CreateAccount'
import AccountList from './pages/AccountList'
import Report from './pages/Report'
import {Route, withRouter} from 'react-router-dom'
import EditCategory from './pages/EditCategory'
import CreateCategory from './pages/CreateCategory'
import QrCode from './components/QrCode'
import './App.scss'
import {setCategories, setItems, setNewCategory} from './localStorage'

export const AppContext = createContext()

class App extends Component {
  constructor(props) {
    super(props)
    let nav = this.getNav()
    setItems()
    setCategories()
    setNewCategory()
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
    const pathname = this.props.history.location.pathname
    let nav = 'jizhang'
    if (pathname === '/report') {
      nav = 'report'
    } else if (pathname === ' p/list') {
      nav = 'detail'
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
        <Nav type={navType} onClickNav={this.onClickNav}/>
      </AppContext.Provider>
    )
  }
}

export default withRouter(App)
