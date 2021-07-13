import React, {Component, Fragment} from 'react'
import {withRouter} from 'react-router-dom'

import Header from '../components/Header'
import CategoryForm from '../components/CategoryForm'
import Loading from '../components/Loading'
import {error, success} from '../utils'
import {addCategory, getNewIcons} from '../api/category'
import Nav from '../components/Nav'
import withContext from '../withContext'

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
    getNewIcons().then(res => {
      const {data, code, message} = res.data
      if (code === 0) {
        this.setState({
          categories: data,
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
        isLoading: false
      })
    })
  }

  onCreateCategory = ({name, current}) => {
    this.setState({
      isLoading: true
    })
    const newItem = this.getNewItem({name, current})
    addCategory(newItem).then((res) => {
      const {code, message} = res.data
      if (code === 0) {
        success('添加成功!')
        this.props.history.push('/editCategory')
      } else {
        error(message)
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
    const {navType} = this.props.data
    const {onClickNav} = this.props.actions
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
        <Nav type={navType} onClickNav={() => onClickNav()}/>
      </Fragment>
    )
  }
}

export default withRouter(withContext(CreateCategory))