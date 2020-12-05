import React, {Fragment, Component} from 'react'
import Header from '../components/Header'
import Calendar from '../components/Calendar'
import PieChart from '../components/PieChart'
import withContext from '../withContext'
import './Report.scss'
import {withRouter} from 'react-router-dom'
import {getYearAndMonth} from '../utils'
import axios from 'axios'
import EmptyData from '../components/EmptyData'
import Loading from '../components/Loading'

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
    const url = !!date
      ? `/items?monthCategory=${date}&_sort=timestamp&_order=desc`
      : `/items?_sort=timestamp&_order=desc`
    const promiseArray = [
      axios.get('/categories'),
      axios.get(url)
    ]
    Promise.all(promiseArray).then(res => {
      const [categories, items] = res
      this.setState({
        categories: categories.data,
        items: items.data,
        isLoading: false
      })
    }).catch(error => {
      console.log(error)
    })
  }

  getListByDate = (date) => {
    this.setState({
      isLoading: true
    })
    axios.get(`/items?monthCategory=${date}&_sort=timestamp&_order=desc`).then(res => {
      this.setState({
        items: res.data,
        isLoading: false
      })
    }).catch(err => {
      console.log(err)
    })
  }

  onChangeDate = (date) => {
    this.setState({
      dateString: date
    })
    this.getListByDate(date)
  }

  handleChartData() {
    const {type} = this.props
    const {categories, items} = this.state
    let categoriesFlattern = categories.reduce((prev, item) => {
      prev[item.id] = item
      return prev
    }, {})
    let itemsFlattern = items.reduce((prev, item) => {
      const name = categoriesFlattern[item.cid].name
      const cType = categoriesFlattern[item.cid].type
      if (!prev[cType]) {
        prev[cType] = {}
      }
      if (!prev[cType][name]) {
        prev[cType][name] = []
      }
      prev[cType][name].push(item)
      return prev
    }, {})
    const keys = Object.keys(itemsFlattern)
    let outcome = []
    let income = []
    let totalIncome = 0
    let totalOutcome = 0
    if (keys.length) {
      outcome = itemsFlattern['outcome'] ? Object.keys(itemsFlattern['outcome']).map(item => {
        const price = itemsFlattern['outcome'][item].reduce((prev, e) => {
          prev += e.price
          return prev
        }, 0)
        return {
          name: item,
          value: price
        }
      }) : []
      income = itemsFlattern['income'] ? Object.keys(itemsFlattern['income']).map(item => {
        const price = itemsFlattern['income'][item].reduce((prev, e) => {
          prev += e.price
          return prev
        }, 0)
        return {
          name: item,
          value: price
        }
      }) : []
      totalOutcome = outcome.reduce((prev, item) => {
        prev += item.value
        return prev
      }, 0)
      totalIncome = income.reduce((prev, item) => {
        prev += item.value
        return prev
      }, 0)
    }
    if (type === 'outcome') {
      return {chartData: outcome, totalIncome, totalOutcome}
    } else {
      return {chartData: income, totalIncome, totalOutcome}
    }
  }

  render() {
    const {type, onClickType} = this.props
    const {dateString, isLoading} = this.state
    const {chartData, totalOutcome, totalIncome} = this.handleChartData()
    const balance = totalIncome - totalOutcome
    const isEmpty = chartData.length
    return (
      <Fragment>
        <Header type={type} onClickType={onClickType}/>
        <main className={'main-wrapper'}>
          <Calendar date={dateString} onChangeDate={this.onChangeDate}/>
          <ul className={'total-wrapper'}>
            <li className={`total-outcome ${isEmpty ? '' : 'empty'}`} onClick={() => onClickType('outcome')}>
              {'-' + (isEmpty ? totalOutcome : '')}
            </li>
            <li className={`total-income ${isEmpty ? '' : 'empty'}`} onClick={() => onClickType('income')}>
              {'+' + (isEmpty ? totalIncome : '')}
            </li>
          </ul>
          <div className={'total'}>
            <span className={`${balance < 0 ? 'deficit' : 'profit'} ${isEmpty ? '' : 'empty'}`}>
              {`共计: ${(isEmpty ? balance : '')}`}
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

export default withRouter(withContext(Report))