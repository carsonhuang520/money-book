import React, {Fragment, Component} from 'react'
import {Input, DatePicker, Button} from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
import Category from './Category'
import moment from 'moment'
import './RecordForm.scss'
import {getYearAndMonth, toThousandFilter, confirm} from '../utils'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')

const dateFormat = 'YYYY-MM-DD'

class RecordForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: getYearAndMonth('date'),
      name: '',
      money: '0',
      category: {}
    }
  }

  onNameChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }
  onMoneyChange = (e) => {
    let money = e.target.value.split(',').join('')
    this.setState({
      money: toThousandFilter(money)
    })
  }
  onMoneyFocus = (e) => {
    if (this.state.money === '0') {
      this.setState({
        money: ''
      })
    }
  }
  onMoneyBlur = (e) => {
    if (this.state.money === '') {
      this.setState({
        money: '0'
      })
    }
  }
  onDateChange = (date, dateString) => {
    this.setState({
      date: dateString
    })
  }

  onCreateAccount = () => {
    const {date, name, money, category} = this.state
    const isValidate = this.validateForm()
    if (!isValidate) {
      return
    }
    const info = {
      date,
      name,
      money: money.split(',').join('')
    }
    this.props.createItem(info, category)
  }
  validateForm = () => {
    const {date, name, money, category} = this.state
    if (date === '') {
      confirm('日期不能为空!')
      return false
    }
    if (name === '') {
      confirm('备注不能为空!')
      return false
    }
    if (money === '0') {
      confirm('金额必须要大于0!')
      return false
    }
    if (Object.keys(category).length === 0) {
      confirm('请选择一个类别!')
      return false
    }
    return true
  }

  onClickItem = (item) => {
    this.setState({
      category: item
    })
  }

  render() {
    let {type, categories, isLoading, isBtnLoading} = this.props
    const {date, name, money, category} = this.state
    return (
      <Fragment>
        <div className={'form-wrapper'}>
          <ul className={'form-list'}>
            <li className={'form-item'}>
              <label className={'form-item-label'}>日期</label>
              <div className={'form-item-content'}>
                <DatePicker className={'form-item-input'} value={moment(date, dateFormat)}
                            onChange={this.onDateChange} locale={locale}/>
              </div>
            </li>
            <li className={'form-item'}>
              <label className={'form-item-label'}>记录</label>
              <div className={'form-item-content'}>
                <Input className={'form-item-input'} placeholder="在这里输入备注" value={name} allowClear
                       onChange={this.onNameChange}/>
              </div>
            </li>
            <li className={'form-item'}>
              {type === 'outcome' ? <label className={'form-item-label'}>支出</label> :
                <label className={'form-item-label'}>收入</label>}
              <div className={'form-item-content'}>
                <Input className={'form-item-input money'} value={money} allowClear
                       onChange={this.onMoneyChange} onFocus={this.onMoneyFocus} onBlur={this.onMoneyBlur}/>
              </div>
            </li>
            <li className={'form-item'}>
              <Category currentItem={category} isLoading={isLoading} categories={categories}
                        onClickItem={this.onClickItem}/>
            </li>
          </ul>
        </div>
        <div className={'button-wrapper'}>
          {
            !isBtnLoading
              ? <Button shape="round" className={'btn-create'} type={'primary'} onClick={this.onCreateAccount}>记一笔</Button>
              : <Button shape="round" className={'btn-create'} type={'primary'} loading>加载中</Button>
          }
        </div>
      </Fragment>
    )
  }
}

export default RecordForm