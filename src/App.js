import './App.css'
import React, {Component, Fragment} from 'react'
import Nav from './components/Nav'
import CreateAccount from './pages/CreateAccount'
import AccountList from './pages/AccountList'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'outcome'
    }
  }

  onClickType = (type) => {
    this.setState({
      type: type
    })
  }

  render() {
    const {type} = this.state
    return (
      <Fragment>
        <AccountList type={type} onClickType={this.onClickType}/>
        <Nav/>
      </Fragment>
    )
  }


}

export default App
