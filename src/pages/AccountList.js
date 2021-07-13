import React, {Component, Fragment} from 'react'

import PriceList from '../components/PriceList'
import Calendar from '../components/Calendar'
import withContext from '../withContext'
import {error, getYearAndMonth, success} from '../utils'
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
      this.setState({
        isLoading: false,
      })
    })
  }

  onDeleteItem(delItem) {
    this.setState({
      isLoading: true
    })
    deleteAccount(delItem.accountId).then(res => {
      const {code, message} = res.data
      this.setState({
        isLoading: false,
      })
      if (code === 0) {
        success('删除成功!')
        this.getAccountsByDate(this.state.dateString)
      } else {
        error(message)
      }
    }).catch(err => {
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