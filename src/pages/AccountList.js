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
    this.setState({
      isLoading: true
    })
    const items = getItems().filter(item => item.monthCategory.indexOf(e) >= 0)
      .sort((a, b) => b.timestamp - a.timestamp)
    const categories = getCategories()
    this.setState({
      isLoading: false,
      categories: categories,
      items: items,
    })
    // const url = `/items?monthCategory=${e}&_sort=timestamp&_order=desc`
    // const promises = [axios.get('/categories'), axios.get(url)]
    // Promise.all(promises).then(res => {
    //   const [categories, items] = res
    //   this.setState({
    //     isLoading: false,
    //     categories: categories.data,
    //     items: items.data,
    //   })
    // }).catch(error => {
    //   console.log(error)
    // })
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
    const {dateString, categories, items, isLoading} = this.state
    return (
      <Fragment>
        <header className={'header-wrapper'}>明细</header>
        <main className={'main-wrapper'}>
          <Calendar date={dateString} onChangeDate={this.onChangeDate}/>
          {
            isLoading
              ? <Loading/>
              : (items.length ?
              <PriceList categories={categories} items={items}
                         onDeleteItem={(item) => this.onDeleteItem(item)}
              /> :
              <EmptyData/>)
          }
        </main>
      </Fragment>
    )
  }
}

export default withContext(AccountList)