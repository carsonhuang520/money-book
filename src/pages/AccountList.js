import React, {Component, Fragment} from 'react'
import PriceList from '../components/PriceList'
import Calendar from '../components/Calendar'
import withContext from '../withContext'
import {getYearAndMonth, success} from '../utils'
import axios from 'axios'
import EmptyData from '../components/EmptyData'
import Loading from '../components/Loading'
import {getCategories, getItems, setItems} from '../localStorage'

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
    this.initListData(dateString)
  }

  initListData = (e) => {
    this.getAccountsByDate(this.state.dateString)
  }

  onChangeDate = (date) => {
    this.setState({
      dateString: date
    })
    this.getAccountsByDate(date)
  }

  getAccountsByDate = (date) => {
    this.setState({
      isLoading: true,
    })
    axios.get(`http://localhost:8000/accounts?date=${date}`).then(res => {
      console.log(res.data)
      const {data} = res.data
      this.setState({
        items: data,
        isLoading: false
      })
    }).catch(err => {
      console.log(err)
      this.setState({
        isLoading: true,
      })
    })
  }

  onDeleteItem(delItem) {
    this.setState({
      isLoading: true
    })
    const {items} = this.state
    const newItems = items.filter(item => item.id !== delItem.id)
    setItems(newItems)
    success('删除成功!')
    this.setState({
      isLoading: false,
      items: newItems,
    })
  }

  render() {
    const {dateString, items, isLoading} = this.state
    return (
      <Fragment>
        <header className={'header-wrapper'}>明细</header>
        <main className={'main-wrapper'}>
          <Calendar date={dateString} onChangeDate={this.onChangeDate}/>
          {
            isLoading
              ? <Loading/>
              : (items.length ?
              <PriceList items={items} onDeleteItem={(item) => this.onDeleteItem(item)}
              /> :
              <EmptyData/>)
          }
        </main>
      </Fragment>
    )
  }
}

export default withContext(AccountList)