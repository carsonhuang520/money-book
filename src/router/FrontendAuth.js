import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'

import RouterConfig from './config'
import {getAuthToken} from '../localStorage'
import {error} from '../utils'

class FrontendAuth extends Component {
  render() {
    const pathname = this.props.location.pathname
    const targetRouter = RouterConfig.find(item => item.path === pathname)
    const authToken = getAuthToken()

    if (!authToken) {
      if (targetRouter.auth) {
        error('请先登录')
        return <Redirect to={'/login'}/>
      } else {
        return <Route exact path={targetRouter.path} component={targetRouter.component}/>
      }
    } else {
      if (pathname === '/login') {
        return <Redirect to={'/'}/>
      } else {
        return <Route exact path={targetRouter.path} component={targetRouter.component}/>
      }
    }

  }
}

export default FrontendAuth