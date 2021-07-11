import React, {Component, Fragment} from 'react'
import Header from '../components/Header'
import CategoryList from '../components/CategoryList'
import axios from 'axios'
import Loading from '../components/Loading'
import {success} from '../utils'
import {getCategories, setCategories} from '../localStorage'

class EditCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      isLoading: false,
      type: 'outcome'
    }
  }

  componentDidMount() {
    this.initData()
  }

  initData = () => {
    this.getCategoriesByType(this.state.type)
  }

  getCategoriesByType = (type) => {
    this.setState({
      isLoading: true
    })
    axios.get(`http://localhost:8000/category?type=${type}`).then(res => {
      const {data} = res.data
      this.setState({
        categories: data,
        isLoading: false
      })
    }).catch(error => {
      console.log(error)
      this.setState({
        isLoading: false
      })
    })
  }

  onDeleteCategory = (item) => {
    this.setState({
      isLoading: true
    })
    axios.delete(`http://localhost:8000/category/${item.id}?type=${this.state.type}`).then((res) => {
      const {code} = res.data
      if(code === 0) {
        success('删除成功!')
        this.setState({
          isLoading: false,
        })
        this.getCategoriesByType(this.state.type)
      } else {
        success('删除失败!')
        this.setState({
          isLoading: false,
        })
      }
    }).catch(error => {
      this.setState({
        isLoading: false
      })
      console.log(error)
    })
  }

  onClickType = (type) => {
    this.setState({
      type
    })
    this.getCategoriesByType(type)
  }

  render() {
    const {categories, isLoading, type} = this.state
    const categoriesFilter = categories.filter(item => item.type === type && item.name !== '编辑' && item.name !== '其他')
    return (
      <Fragment>
        <Header type={type} onClickType={this.onClickType}/>
        <main className={'main-wrapper'}>
          {
            isLoading
              ? <Loading/>
              : <CategoryList type={type} categories={categoriesFilter} onDeleteCategory={this.onDeleteCategory}/>
          }
        </main>
      </Fragment>
    )
  }
}

export default EditCategory