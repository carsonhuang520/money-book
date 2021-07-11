import React, {Component, Fragment} from 'react'
import Header from '../components/Header'
import CategoryForm from '../components/CategoryForm'
import axios from 'axios'
import Loading from '../components/Loading'
import {ID, success} from '../utils'
import {withRouter} from 'react-router-dom'
import {getCategories, getNewCategory, setCategories} from '../localStorage'

class CreateCategory extends Component {
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
    this.getIcons()
  }

  getIcons = () => {
    this.setState({
      isLoading: true
    })
    axios.get('http://localhost:8000/icons').then(res => {
      const {data} = res.data
      this.setState({
        categories: data,
        isLoading: false
      })
    }).catch(err => {
      console.log(err)
      this.setState({
        isLoading: false
      })
    })
  }

  onCreateCategory = ({name, current}) => {
    this.setState({
      isLoading: true
    })
    const newItem = this.getNewItem({name, current})
    axios.post('http://localhost:8000/category', newItem).then((res) => {
      const {code, message} = res.data
      if(code === 0) {
        success('添加成功!')
        this.props.history.push('/editCategory')
      } else {
        success(message)
      }
      this.setState({
        isLoading: false
      })
    }).catch(error => {
      console.log(error)
      this.setState({
        isLoading: false
      })
    })
  }

  getNewItem = ({name, current}) => {
    const {type} = this.state
    const newItem = {
      name,
      type,
      iconName: current.iconName
    }
    return newItem
  }

  onClickType = (type) => {
    this.setState({
      type
    })
  }

  render() {
    const {isLoading, type, categories} = this.state
    return (
      <Fragment>
        <Header type={type} onClickType={this.onClickType}/>
        <main className={'main-wrapper'}>
          {
            isLoading
              ? <Loading/>
              : <CategoryForm type={type} onCreateCategory={this.onCreateCategory}
                              categories={categories}
              />
          }
        </main>
      </Fragment>
    )
  }
}

export default withRouter(CreateCategory)