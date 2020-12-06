import React, {Component, Fragment} from 'react'
import Header from '../components/Header'
import RecordForm from '../components/RecordForm'
import withContext from '../withContext'
import {ID, success} from '../utils'
import axios from 'axios'
import {getCategories, getItems, setItems} from '../localStorage'

class CreateAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      isLoading: false,
      isBtnLoading: false
    }
  }

  componentDidMount() {
    this.initData()
  }

  initData = () => {
    this.setState({
      isLoading: true
    })
    const categories = getCategories()
    this.setState({
      categories: categories,
      isLoading: false
    })
    // axios.get('/categories').then(res => {
    //   this.setState({
    //     categories: res.data,
    //     isLoading: false
    //   })
    // }).catch(error => {
    //   console.log(error)
    // })
  }

  createItem = (item, category) => {
    this.setState({
      isBtnLoading: true
    })
    const newItem = this.getNewItem(item, category)
    const items = getItems()
    const newItems = JSON.parse(JSON.stringify(items))
    newItems.push(newItem)
    setItems(newItems)
    this.setState({
      isBtnLoading: false
    })
    success('已保存')
    // axios.post(`/items`, newItem).then(() => {
    //   this.setState({
    //     isBtnLoading: false
    //   })
    //   success('已保存')
    // })
  }

  getNewItem = (item, category) => {
    const newId = ID()
    const {date, name, money} = item
    const monthCategory = date.substring(0, date.lastIndexOf('-'))
    const timestamp = new Date(date).getTime()
    const newItem = {
      name,
      date,
      price: parseInt(money),
      id: newId,
      timestamp,
      monthCategory,
      cid: category.id
    }
    return newItem
  }

  render() {
    const {type, onClickType} = this.props
    const {categories, isLoading, isBtnLoading} = this.state
    const categoriesFilter = categories.filter(item => item.type === type)
    return (
      <Fragment>
        <Header type={type} onClickType={onClickType}/>
        <main className={'main-wrapper'}>
          <RecordForm createItem={this.createItem}
                      categories={categoriesFilter}
                      type={type}
                      isLoading={isLoading}
                      isBtnLoading={isBtnLoading}
          />
        </main>
      </Fragment>
    )
  }
}

export default withContext(CreateAccount)