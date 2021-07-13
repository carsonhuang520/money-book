import React, {Component, Fragment} from 'react'

import PriceList from '../components/PriceList'
import Calendar from '../components/Calendar'
import withContext from '../withContext'
import {getYearAndMonth, success} from '../utils'
import EmptyData from '../components/EmptyData'
import Loading from '../components/Loading'
import {deleteAccount, getAccountList} from '../api/account'
import Nav from '../components/Nav'

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

  initListData = () => {
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
    getAccountList(date).then(res => {
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
    deleteAccount(delItem.accountId).then(res => {
      success('删除成功!')
      this.setState({
        isLoading: false,
      })
      this.getAccountsByDate(this.state.dateString)
    }).catch(err => {
      success('删除失败!')
      this.setState({
        isLoading: false,
      })
    })
  }

  render() {
    const {navType} = this.props.data
    const {onClickNav} = this.props.actions
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
        <Nav type={navType} onClickNav={() => onClickNav()}/>
      </Fragment>
    )
  }
}

export default withContext(AccountList)