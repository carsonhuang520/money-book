import React, {Fragment} from 'react'
import Header from '../components/Header'
import Calendar from '../components/Calendar'
import PieChart from '../components/PieChart'
import './Report.scss'
import {withRouter} from 'react-router-dom'

function Report(props) {
  const {type, onClickType} = props
  return (
    <Fragment>
      <Header type={type} onClickType={onClickType}/>
      <main className={'main-wrapper'}>
        <Calendar/>
        <ul className={'total-wrapper'}>
          <li className={'total-outcome'} onClick={() => onClickType('outcome')}>{'-' + 100}</li>
          <li className={'total-income'} onClick={() => onClickType('income')}>{'+' + 200}</li>
        </ul>
        <div className={'total'}>
          <span className={'profit'}>{`共计: ${100}`}</span>
        </div>
        <PieChart type={type}/>
      </main>
    </Fragment>
  )
}

export default withRouter(Report)