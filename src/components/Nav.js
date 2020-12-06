import React, {Component} from 'react'
import './Nav.scss'
import {withRouter} from 'react-router-dom'
import Icon from './Icon'

class Nav extends Component {
  onClickNav = (e, type) => {
    e.preventDefault()
    if (type === 'jizhang') {
      this.props.history.push('/')
    } else if (type === 'detail') {
      this.props.history.push('/list')
    } else {
      this.props.history.push('/report')
    }
    this.props.onClickNav(type)
  }

  render() {
    const {type} = this.props
    return (
      <nav className={'nav-wrapper'}>
        <a className={`${type === 'jizhang' ? 'active' : ''}`} href={'/'}
           onClick={(e) => this.onClickNav(e, 'jizhang')}>
          <Icon name={'jizhang'}/>
          <span>记账</span></a>
        <a className={`${type === 'detail' ? 'active' : ''}`} href={'/'}
           onClick={(e) => this.onClickNav(e, 'detail')}>
          <Icon name={'mingxi'}/>
          <span>明细</span></a>
        <a className={`${type === 'report' ? 'active' : ''}`} href={'/'}
           onClick={(e) => this.onClickNav(e, 'report')}>
          <Icon name={'baogao'}/>
          <span>报告</span></a>
      </nav>
    )
  }
}

export default withRouter(Nav)