import React, {Component} from 'react'
import {DatePicker} from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
import './Calendar.scss'
import moment from 'moment'

const dateFormat = 'YYYY-MM'

class Calendar extends Component {
  constructor(props) {
    super(props)
  }

  onChange = (date, dateString) => {
    this.props.onChangeDate(dateString)
  }

  render() {
    const {date} = this.props
    return (
      <div className={'calendar-wrapper'}>
        <DatePicker className={'calendar'} picker="month" value={moment(date, dateFormat)}
                    locale={locale} onChange={this.onChange}/>
      </div>
    )
  }


}

export default Calendar