import React, {Component} from 'react'
import './Nav.scss'

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {type} = this.props
    return (
      <nav className={'nav-wrapper'}>
        <a className={`${type === 'jizhang' ? 'active' : ''}`} href={'/'}>
          <svg className="icon category-item-content-icon" aria-hidden="true">
            <use xlinkHref="#icon-jizhang"/>
          </svg>
          <span>记账</span></a>
        <a className={`${type === 'detail' ? 'active' : ''}`} href={'/list'}>
          <svg className="icon category-item-content-icon" aria-hidden="true">
            <use xlinkHref="#icon-mingxi"/>
          </svg>
          <span>明细</span></a>
        <a className={`${type === 'report' ? 'active' : ''}`} href={'/report'}>
          <svg className="icon category-item-content-icon" aria-hidden="true">
            <use xlinkHref="#icon-baogao"/>
          </svg>
          <span>报告</span></a>
      </nav>
    )
  }
}

export default Nav