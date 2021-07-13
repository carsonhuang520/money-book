import React, {Component, Fragment} from 'react'
import {withRouter} from 'react-router-dom'

import Header from '../components/Header'
import RecordForm from '../components/RecordForm'
import {success} from '../utils'
import {getCategoriesByType} from '../api/category'
import {addAccount} from '../api/account'
import Nav from '../components/Nav'
import withContext from '../withContext'

class CreateAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'outcome',
      categories: [],
      isLoading: false,
      isBtnLoading: false,
    }
  }

  componentDidMount() {
    this.initData()
  }

  initData = () => {
    this.getCategories(this.state.type)
  }

  getCategories = (type) => {
    this.setState({
      isLoading: true
    })
    getCategoriesByType(type).then(res => {
      const {data} = res.data
      this.setState({
        categories: data,
        isLoading: false
      })
    }).catch(error => {
      console.log(error)
    })
  }

  createItem = (item, category) => {
    this.setState({
      isBtnLoading: true
    })
    const newItem = this.getNewItem(item, category)
    console.log(newItem)
    addAccount(newItem).then((res) => {
      if (res.data.code === 0) {
        this.setState({
          isBtnLoading: false
        })
        success('已保存')
      }
    }).catch(err => {
      this.setState({
        isBtnLoading: false
      })
    })
  }

  getNewItem = (item, category) => {
    const {date, name, money} = item
    let newDate = date.isBefore(new Date(), 'day')
      ? date.format(`YYYY/MM/DD`) + ' 23:59'
      : date.format('YYYY/MM/DD HH:mm')
    const newItem = {
      description: name,
      date: newDate,
      price: parseInt(money),
      categoryId: category.id
    }
    return newItem
  }

  onClickType = (type) => {
    this.setState({
      type
    })
    this.getCategories(type)
  }

  render() {
    const {navType} = this.props.data
    const {onClickNav} = this.props.actions
    const {categories, isLoading, isBtnLoading, type} = this.state
    const categoriesFilter = categories.filter(item => item.type === type)
    return (
      <Fragment>
        <Header type={type} onClickType={this.onClickType}/>
        <main className={'main-wrapper'}>
          <RecordForm createItem={this.createItem}
                      categories={categoriesFilter}
                      type={type}
                      isLoading={isLoading}
                      isBtnLoading={isBtnLoading}
          />
        </main>
        <Nav type={navType} onClickNav={() => onClickNav()}/>
      </Fragment>
    )
  }
}

export default withRouter(withContext(CreateAccount))