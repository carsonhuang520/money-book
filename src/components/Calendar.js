import React from 'react'
import {DatePicker} from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
import './Calendar.scss'

function Calendar(props) {
  return (
    <div className={'calendar-wrapper'}>
      <DatePicker className={'calendar'} picker="month" locale={locale}/>
    </div>
  )
}

export default Calendar