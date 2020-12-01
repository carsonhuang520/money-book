import React, {Component} from 'react'
import './Nav.scss'

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'jizhang'
    }
  }

  onClickRoute = (type) => {
    this.setState({
      type
    })
  }

  render() {
    const {type} = this.state
    return (
      <nav className={'nav-wrapper'}>
        <a className={`${type === 'jizhang' ? 'active' : ''}`} href={'#'}
           onClick={() => this.onClickRoute('jizhang')}>
          <svg className="icon category-item-content-icon" aria-hidden="true">
            <use xlinkHref="#icon-jizhang"/>
          </svg>
          <span>记账</span></a>
        <a className={`${type === 'detail' ? 'active' : ''}`} href={'#'}
           onClick={() => this.onClickRoute('detail')}>
          <svg className="icon category-item-content-icon" aria-hidden="true">
            <use xlinkHref="#icon-mingxi"/>
          </svg>
          <span>明细</span></a>
        <a className={`${type === 'report' ? 'active' : ''}`} href={'#'}
           onClick={() => this.onClickRoute('report')}>
          <svg className="icon category-item-content-icon" aria-hidden="true">
            <use xlinkHref="#icon-baogao"/>
          </svg>
          <span>报告</span></a>
      </nav>
    )
  }
}

export default Nav