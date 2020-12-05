import React, {Component, Fragment} from 'react'
import Header from '../components/Header'
import PriceList from '../components/PriceList'
import Calendar from '../components/Calendar'
import withContext from '../withContext'
import {getYearAndMonth} from '../utils'
import axios from 'axios'

class AccountList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      categories: [],
      dateString: getYearAndMonth('month')
    }
  }

  componentDidMount() {
    const {dateString} = this.state
    this.initData(dateString)
  }

  initData = (date) => {
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
        items: items.data
      })
    }).catch(error => {
      console.log(error)
    })
  }

  onChangeDate = (date) => {
    this.setState({
      dateString: date
    })
    this.getListByDate(date)
  }

  getListByDate = (date) => {
    axios.get(`/items?monthCategory=${date}&_sort=timestamp&_order=desc`).then(res => {
      this.setState({
        items: res.data
      })
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    const {type, onClickType, data} = this.props
    const {dateString, categories, items} = this.state
    return (
      <Fragment>
        <header className={'header-wrapper'}>明细</header>
        <main className={'main-wrapper'}>
          <Calendar date={dateString} onChangeDate={this.onChangeDate}/>
          <PriceList categories={categories} items={items}/>
        </main>
      </Fragment>
    )
  }
}

export default withContext(AccountList)