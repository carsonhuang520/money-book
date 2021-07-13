import React, {Component} from 'react'
import {Button, Input} from 'antd'

import IconList from './IconList'
import {confirm} from '../utils'

class CategoryForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: {},
      name: ''
    }
  }

  onCreateCategory = () => {
    const {name, current} = this.state
    const isValid = this.validateForm(name, current)
    if (!isValid) {
      return
    }
    this.props.onCreateCategory({name, current})
  }

  validateForm = (name, current) => {
    if (name === '') {
      confirm('类别名称不能为空!')
      return false
    }
    if (Object.keys(current).length === 0) {
      confirm('请选择一个类别图标!')
      return false
    }
    return true
  }

  onNameChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  onClickItem = (item) => {
    this.setState({
      current: item
    })
  }

  render() {
    const {current, name} = this.state
    const {categories, type} = this.props
    return (
      <div className={'form-wrapper'}>
        <ul className={'form-list'}>
          <li className={'form-item'}>
            <label className={'form-item-label'}>名字</label>
            <div className={'form-item-content'}>
              <Input className={'form-item-input'} onChange={this.onNameChange} value={name}
                     placeholder="请输入标签名" allowClear
              />
            </div>
          </li>
          <li className={'form-item'}>
            <p className={'category-label'}>分类</p>
            <IconList categories={categories} type={type} onClickItem={this.onClickItem} current={current}/>
          </li>
        </ul>
        <div className={'button-wrapper'}>
          <Button shape="round" className={'btn-create'} type={'primary'} onClick={this.onCreateCategory}>确定</Button>
        </div>
      </div>
    )
  }
}

export default CategoryForm