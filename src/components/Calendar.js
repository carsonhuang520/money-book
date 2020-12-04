import React, {Component} from 'react'
import {DatePicker} from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
import './Calendar.scss'

class Calendar extends Component {
  constructor(props) {
    super(props)
  }

  onChange = (date, dateString) => {
    console.log(date, dateString)
    this.props.onChangeDate(dateString)
  }

  render() {
    const {date} = this.props
    return (
      <div className={'calendar-wrapper'}>
        <DatePicker className={'calendar'} picker="month" locale={locale} onChange={this.onChange}/>
      </div>
    )
  }


}

export default Calendar