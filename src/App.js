import './App.css'
import React, {Component, Fragment, createContext} from 'react'
import Nav from './components/Nav'
import CreateAccount from './pages/CreateAccount'
import AccountList from './pages/AccountList'
import Report from './pages/Report'
import {Route, withRouter} from 'react-router-dom'
import EditCategory from './pages/EditCategory'
import CreateCategory from './pages/CreateCategory'
import axios from 'axios'

export const AppContext = createContext()

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
      navType: nav,
      categories: [],
      items: []
    }
    this.actions = {
      initData: () => {
        const promiseArray = [axios.get('/categories'), axios.get('/items?_sort=timestamp&_order=desc')]
        Promise.all(promiseArray).then(res => {
          const [categories, items] = res
          this.setState({
            categories: categories.data,
            items: items.data
          })
        }).catch(error => {
          console.log(error)
        })
      },
      getListByDate: (date) => {
        axios.get(`/items?monthCategory=${date}&_sort=timestamp&_order=desc`).then(res => {
          this.setState({
            items: res.data
          })
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }

  // componentDidMount() {
  //   console.log('hhhh')
  //   axios.get('/categories').then(res => {
  //
  //     this.setState({
  //       categories: res.data
  //
  //     })
  //     console.log(this.state.categories)
  //   }).catch(error => {
  //     console.log(error)
  //   })
  // }

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
        <Nav type={navType} onClickNav={this.onClickNav}/>
      </AppContext.Provider>
    )
  }
}

export default withRouter(App)
