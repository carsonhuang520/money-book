import React, {Component, Fragment} from 'react'
import Header from '../components/Header'
import CategoryList from '../components/CategoryList'
import axios from 'axios'
import Loading from '../components/Loading'
import {success} from '../utils'

class EditCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      isLoading: false,
    }
  }

  componentDidMount() {
    this.initData()
  }

  initData = () => {
    this.setState({
      isLoading: true
    })
    axios.get('/categories').then(res => {
      this.setState({
        categories: res.data,
        isLoading: false
      })
    }).catch(error => {
      console.log(error)
    })
  }

  onDeleteCategory = (item) => {
    this.setState({
      isLoading: true
    })
    axios.delete(`/categories/${item.id}`).then(() => {
      const newCategories = this.state.categories.filter(e => e.id !== item.id)
      success('删除成功!')
      this.setState({
        categories: newCategories,
        isLoading: false,
      })
    }).catch(error => {
      this.setState({
        isLoading: false
      })
      console.log(error)
    })
  }

  render() {
    const {type, onClickType} = this.props
    const {categories, isLoading} = this.state
    return (
      <Fragment>
        <Header type={type} onClickType={onClickType}/>
        <main className={'main-wrapper'}>
          {
            isLoading
              ? <Loading/>
              : <CategoryList type={type} categories={categories} onDeleteCategory={this.onDeleteCategory}/>
          }
        </main>
      </Fragment>
    )
  }
}

export default EditCategory