import React, {Component} from 'react'
import {Button, Input} from 'antd'
import IconList from './IconList'
import axios from 'axios'

class CategoryForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: []
    }
  }

  componentDidMount() {
    axios.get('/newCategory').then(res => {
      this.setState({
        categories: res.data
      })
    }).catch(error => {
      console.log(error)
    })
  }

  render() {
    return (
      <div className={'form-wrapper'}>
        <ul className={'form-list'}>
          <li className={'form-item'}>
            <label className={'form-item-label'}>名字</label>
            <div className={'form-item-content'}>
              <Input className={'form-item-input'} placeholder="请输入标签名" allowClear/>
            </div>
          </li>
          <li className={'form-item'}>
            <p className={'category-label'}>分类</p>
            <IconList categories={this.state.categories} type={this.props.type}/>
          </li>
        </ul>
        <div className={'button-wrapper'}>
          <Button shape="round" className={'btn-create'}>确定</Button>
        </div>
      </div>
    )
  }
}

export default CategoryForm