import React, {Fragment, Component} from 'react'
import Header from '../components/Header'
import Calendar from '../components/Calendar'
import PieChart from '../components/PieChart'
import './Report.scss'
import {withRouter} from 'react-router-dom'
import {flatternCategory, flatternItemsByType, getYearAndMonth, toThousandFilter} from '../utils'
import axios from 'axios'
import EmptyData from '../components/EmptyData'
import Loading from '../components/Loading'
import {getCategories, getItems} from '../localStorage'
import {Modal} from 'antd'

class Report extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dateString: getYearAndMonth('month'),
      totalOutcome: 0,
      totalIncome: 0,
      items: [],
      categories: [],
      isLoading: false
    }
  }

  componentDidMount() {
    const {dateString} = this.state
    this.initData(dateString)
  }

  initData = (date) => {
    this.setState({
      isLoading: true
    })
    const items = getItems().filter(item => item.monthCategory.indexOf(date) >= 0)
      .sort((a, b) => b.timestamp - a.timestamp)
    const categories = getCategories()
    this.setState({
      isLoading: false,
      categories: categories,
      items: items,
    })
    // const url = `/items?monthCategory=${date}&_sort=timestamp&_order=desc`
    // const promiseArray = [
    //   axios.get('/categories'),
    //   axios.get(url)
    // ]
    // Promise.all(promiseArray).then(res => {
    //   const [categories, items] = res
    //   this.setState({
    //     categories: categories.data,
    //     items: items.data,
    //     isLoading: false
    //   })
    // }).catch(error => {
    //   console.log(error)
    // })
  }

  getListByDate = (date) => {
    this.setState({
      isLoading: true
    })
    const items = getItems().filter(item => item.monthCategory.indexOf(date) >= 0)
      .sort((a, b) => b.timestamp - a.timestamp)
    this.setState({
      isLoading: false,
      items: items,
    })
    // axios.get(`/items?monthCategory=${date}&_sort=timestamp&_order=desc`).then(res => {
    //   this.setState({
    //     items: res.data,
    //     isLoading: false
    //   })
    // }).catch(err => {
    //   console.log(err)
    // })
  }

  onChangeDate = (date) => {
    this.setState({
      dateString: date
    })
    this.getListByDate(date)
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

  getTotalResult = (items) => {
    return items.reduce((prev, item) => {
      prev += item.value
      return prev
    }, 0)
  }

  handleChartData(categories, items, type) {
    let categoriesFlattern = flatternCategory(categories)
    let itemsFlattern = flatternItemsByType(items, categoriesFlattern)
    const keys = Object.keys(itemsFlattern)
    let outcome = []
    let income = []
    let totalIncome = 0
    let totalOutcome = 0
    if (keys.length) {
      outcome = itemsFlattern['outcome'] ? this.getChartData('outcome', itemsFlattern) : []
      income = itemsFlattern['income'] ? this.getChartData('income', itemsFlattern) : []
      totalOutcome = this.getTotalResult(outcome)
      totalIncome = this.getTotalResult(income)
    }
    if (type === 'outcome') {
      return {chartData: outcome, totalIncome, totalOutcome}
    } else {
      return {chartData: income, totalIncome, totalOutcome}
    }
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

  render() {
    const {type, onClickType} = this.props
    const {dateString, isLoading, categories, items} = this.state
    const {chartData, totalOutcome, totalIncome} = this.handleChartData(categories, items, type)
    const balance = totalIncome - totalOutcome
    const isEmpty = chartData.length
    return (
      <Fragment>
        <Header type={type} onClickType={onClickType}/>
        <main className={'main-wrapper'}>
          <Calendar date={dateString} onChangeDate={this.onChangeDate}/>
          <ul className={'total-wrapper'}>
            <li className={`total-outcome ${isEmpty ? '' : 'empty'}`} onClick={() => onClickType('outcome')}>
              {'-' + (isEmpty ? toThousandFilter(totalOutcome) : '')}
            </li>
            <li className={`total-income ${isEmpty ? '' : 'empty'}`} onClick={() => onClickType('income')}>
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
      </Fragment>
    )
  }
}

export default withRouter(Report)