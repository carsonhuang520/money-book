import React, {Component, Fragment} from 'react'
import Header from '../components/Header'
import CategoryForm from '../components/CategoryForm'
import axios from 'axios'
import Loading from '../components/Loading'
import {ID, success} from '../utils'
import {withRouter} from 'react-router-dom'

class CreateCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      isLoading: false
    }
  }

  componentDidMount() {
    this.initData()
  }

  initData = () => {
    this.setState({
      isLoading: true
    })
    axios.get('/newCategory').then(res => {
      this.setState({
        categories: res.data,
        isLoading: false
      })
    }).catch(error => {
      this.setState({
        isLoading: false
      })
      console.log(error)
    })
  }

  onCreateCategory = ({name, current}) => {
    const newItem = this.getNewItem({name, current})
    axios.post('/categories', newItem).then(() => {
      success('添加成功!')
      this.props.history.push('/editCategory')
    }).catch(error => {
      console.log(error)
    })
  }

  getNewItem = ({name, current}) => {
    const {type} = this.props
    const id = ID()
    const newItem = {
      name,
      id,
      type,
      iconName: current.name
    }
    return newItem
  }

  render() {
    const {isLoading, categories} = this.state
    const {type, onClickType} = this.props
    return (
      <Fragment>
        <Header type={type} onClickType={onClickType}/>
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