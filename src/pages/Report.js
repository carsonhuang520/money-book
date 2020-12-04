import React, {Fragment, Component} from 'react'
import Header from '../components/Header'
import Calendar from '../components/Calendar'
import PieChart from '../components/PieChart'
import withContext from '../withContext'
import './Report.scss'
import {withRouter} from 'react-router-dom'

class Report extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dateString: '',
      totalOutcome: 0,
      totalIncome: 0
    }
  }

  componentDidMount() {
    this.props.actions.initData()
  }

  onChangeDate = (date) => {
    this.setState({
      dateString: date
    })
    this.props.actions.getListByDate(date)
  }

  handleChartData() {
    const {type, data} = this.props
    const {categories, items} = data
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
      return {data: outcome, totalIncome, totalOutcome}
    } else {
      return {data: income, totalIncome, totalOutcome}
    }
  }

  render() {
    const {dateString} = this.state
    const {type, onClickType} = this.props
    const {data, totalOutcome, totalIncome} = this.handleChartData()
    const balance = totalIncome - totalOutcome
    return (
      <Fragment>
        <Header type={type} onClickType={onClickType}/>
        <main className={'main-wrapper'}>
          <Calendar date={dateString} onChangeDate={this.onChangeDate}/>
          <ul className={'total-wrapper'}>
            <li className={'total-outcome'} onClick={() => onClickType('outcome')}>{'-' + totalOutcome}</li>
            <li className={'total-income'} onClick={() => onClickType('income')}>{'+' + totalIncome}</li>
          </ul>
          <div className={'total'}>
            <span className={`${balance < 0 ? 'deficit' : 'profit'}`}>{`共计: ${balance}`}</span>
          </div>
          <PieChart type={type} chartData={data}/>
        </main>
      </Fragment>
    )
  }
}

export default withRouter(withContext(Report))