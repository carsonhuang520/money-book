import React, {Component, Fragment} from 'react'
import Header from '../components/Header'
import PriceList from '../components/PriceList'
import Calendar from '../components/Calendar'
import withContext from '../withContext'
import {getYearAndMonth} from '../utils'
import axios from 'axios'
import EmptyData from '../components/EmptyData'
import Loading from '../components/Loading'

class AccountList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      categories: [],
      dateString: getYearAndMonth('month'),
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

  onChangeDate = (date) => {
    this.setState({
      dateString: date
    })
    this.getListByDate(date)
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

  render() {
    const {type, onClickType, data} = this.props
    const {dateString, categories, items, isLoading} = this.state
    return (
      <Fragment>
        <header className={'header-wrapper'}>明细</header>
        <main className={'main-wrapper'}>
          <Calendar date={dateString} onChangeDate={this.onChangeDate}/>
          {
            isLoading
              ? <Loading/>
              : (items.length ? <PriceList categories={categories} items={items}/> : <EmptyData/>)
          }
        </main>
      </Fragment>
    )
  }
}

export default withContext(AccountList)