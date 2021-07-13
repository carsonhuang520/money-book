import React from 'react'
import {Button} from 'antd'

import './Header.scss'

function Header(props) {
  const {type, onClickType} = props
  return (
    <header className={'header-wrapper'}>
      <Button shape="round" className={`btn ${type === 'outcome' ? 'active' : ''}`}
              onClick={() => onClickType('outcome')}>支出</Button>
      <Button shape="round" className={`btn ${type === 'income' ? 'active' : ''}`}
              onClick={() => onClickType('income')}>收入</Button>
    </header>
  )
}

export default Header