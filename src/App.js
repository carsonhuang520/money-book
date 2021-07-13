import React, {Component, createContext} from 'react'
import {HashRouter, Switch} from 'react-router-dom'

import QrCode from './components/QrCode'
import './App.scss'
import FrontendAuth from './router/FrontendAuth'

export const AppContext = createContext()

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navType: 'jizhang',
      qrCodeVisible: false,
      el: null
    }
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

  onClickNav = (type) => {
    this.setState({
      navType: type
    })
  }

  render() {
    const {qrCodeVisible} = this.state
    return (
      <AppContext.Provider value={{state: this.state, actions: {onClickNav: this.onClickNav}}}>
        <HashRouter>
          <Switch>
            <FrontendAuth></FrontendAuth>
          </Switch>
        </HashRouter>
        {qrCodeVisible ? <QrCode/> : null}
      </AppContext.Provider>
    )
  }
}

export default App
