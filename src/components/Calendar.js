import React from 'react'
import {DatePicker} from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
import './Calendar.scss'
import 'moment/locale/zh-cn'
import moment from 'moment'

moment.locale('zh-cn')

const dateFormat = 'YYYY-MM'

function Calendar(props) {
  const {date, onChangeDate} = props
  return (
    <div className={'calendar-wrapper'}>
      <DatePicker className={'calendar'} picker="month" value={moment(date, dateFormat)}
                  locale={locale} onChange={(date, dateString) => onChangeDate(dateString)}/>
    </div>
  )
}

export default Calendar