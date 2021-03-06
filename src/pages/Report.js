import React, {Fragment, Component} from 'react'
import {Modal} from 'antd'
import {withRouter} from 'react-router-dom'

import Header from '../components/Header'
import Calendar from '../components/Calendar'
import PieChart from '../components/PieChart'
import './Report.scss'
import {error, getYearAndMonth, toThousandFilter} from '../utils'
import EmptyData from '../components/EmptyData'
import Loading from '../components/Loading'
import {getChartAccounts, getTotalAccounts} from '../api/account'
import Nav from '../components/Nav'
import withContext from '../withContext'

class Report extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'outcome',
      dateString: getYearAndMonth('month'),
      totalOutcome: 0,
      totalIncome: 0,
      items: [],
      isLoading: false
    }
  }

  componentDidMount() {
    this.initData()
  }

  initData = () => {
    this.getChartsDataByTypeAndDate(this.state.type, this.state.dateString)
    this.getTotalByMonth(this.state.dateString)
  }

  getChartsDataByTypeAndDate = (type, date) => {
    this.setState({
      isLoading: true
    })
    getChartAccounts(date, type).then(res => {
      const {data, code, message} = res.data
      if (code === 0) {
        this.setState({
          items: data,
          isLoading: false
        })
      } else {
        error(message)
        this.setState({
          isLoading: false
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }

  onChangeDate = (date) => {
    this.setState({
      dateString: date
    })
    this.getChartsDataByTypeAndDate(this.state.type, date)
    this.getTotalByMonth(date)
  }

  getChartData = (type, itemsFlattern) => {
    return Object.keys(itemsFlattern[type]).map(item => {
      const price = itemsFlattern[type][item].reduce((prev, e) => {
        prev += e.price
        return prev
      }, 0)
      return {
        name: item,
        value: price
      }
    })
  }

  getTotalByMonth = (date) => {
    getTotalAccounts(date).then(res => {
      const {data} = res.data
      if (data.length === 0) {
        this.setState({
          totalOutcome: 0,
          totalIncome: 0
        })
      } else if (data.length === 1) {
        data.forEach(item => {
          if (item.type === 'outcome') {
            this.setState({
              totalOutcome: item.total,
              totalIncome: 0
            })
          } else {
            this.setState({
              totalIncome: item.total,
              totalOutcome: 0
            })
          }
        })
      } else {
        data.forEach(item => {
          if (item.type === 'outcome') {
            this.setState({
              totalOutcome: item.total
            })
          } else {
            this.setState({
              totalIncome: item.total
            })
          }
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }

  handleChartData(items, type) {
    let result = []
    let obj = {}
    obj = items.reduce((prev, item) => {
      if (!prev[item.categoryName]) {
        prev[item.categoryName] = []
      }
      prev[item.categoryName].push(item)
      return prev
    }, {})
    result = Object.keys(obj).map(item => {
      const price = obj[item].reduce((prev, cur) => {
        prev += cur.price
        return prev
      }, 0)
      return {
        name: item,
        value: price
      }
    })
    return result
  }

  notice(balance) {
    if (balance < 0) {
      Modal.warning({
        content: '注意收支平衡哦~~~',
        centered: true
      })
    } else {
      Modal.success({
        content: '攒钱高手~~~',
        centered: true
      })
    }
  }

  onClickType = (type) => {
    console.log(type)
    this.setState({
      type
    })
    this.getChartsDataByTypeAndDate(type, this.state.dateString)
    this.getTotalByMonth(this.state.dateString)
  }

  render() {
    const {navType} = this.props.data
    const {onClickNav} = this.props.actions
    const {dateString, isLoading, type, items, totalIncome, totalOutcome} = this.state
    const chartData = this.handleChartData(items, type)
    const balance = totalIncome - totalOutcome
    const isEmpty = chartData.length
    return (
      <Fragment>
        <Header type={type} onClickType={this.onClickType}/>
        <main className={'main-wrapper'}>
          <Calendar date={dateString} onChangeDate={this.onChangeDate}/>
          <ul className={'total-wrapper'}>
            <li className={`total-outcome ${isEmpty ? '' : 'empty'}`} onClick={() => this.onClickType('outcome')}>
              {'-' + (isEmpty ? toThousandFilter(totalOutcome) : '')}
            </li>
            <li className={`total-income ${isEmpty ? '' : 'empty'}`} onClick={() => this.onClickType('income')}>
              {'+' + (isEmpty ? toThousandFilter(totalIncome) : '')}
            </li>
          </ul>
          <div className={'total'}>
            <span className={`${balance < 0 ? 'deficit' : 'profit'} ${isEmpty ? '' : 'empty'}`}
                  onClick={() => this.notice(balance)}>
              {`共计: ${(isEmpty ? toThousandFilter(balance) : '')}`}
            </span>
          </div>
          {
            isLoading
              ? <Loading/>
              : (isEmpty ? <PieChart type={type} chartData={chartData}/> : <EmptyData/>)
          }
        </main>
        <Nav type={navType} onClickNav={() => onClickNav()}/>
      </Fragment>
    )
  }
}

export default withRouter(withContext(Report))