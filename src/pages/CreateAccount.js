import React, {Component, Fragment} from 'react'
import Header from '../components/Header'
import RecordForm from '../components/RecordForm'
import withContext from '../withContext'
import {ID, success} from '../utils'
import axios from 'axios'

class CreateAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      categories: [],
    }
  }

  componentDidMount() {
    this.initData()
  }

  initData = (dateString) => {
    const url = !!dateString
      ? `/items?monthCategory=${dateString}&_sort=timestamp&_order=desc`
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

  createItem = (item, category) => {
    const newId = ID()
    const {date, name, money} = item
    item.monthCategory = date.substring(0, date.lastIndexOf('-'))
    item.timestamp = new Date(date).getTime()
    const newItem = {
      name,
      date,
      price: parseInt(money),
      id: newId,
      timestamp: item.timestamp,
      monthCategory: item.monthCategory,
      cid: category.id
    }
    axios.post(`/items`, newItem).then(() => {
      const newItems = JSON.parse(JSON.stringify(this.state.items))
      newItems.push(newItem)
      this.setState({
        items: newItems
      })
      success('已保存')
    })
  }

  render() {
    const {type, onClickType} = this.props
    const {categories} = this.state
    return (
      <Fragment>
        <Header type={type} onClickType={onClickType}/>
        <main className={'main-wrapper'}>
          <RecordForm createItem={this.createItem}
                      categories={categories}
                      type={type}
          />
        </main>
      </Fragment>
    )
  }
}

export default withContext(CreateAccount)