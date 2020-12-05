import React, {Component} from 'react'
import {Modal} from 'antd'
import {withRouter} from 'react-router-dom'
import {QuestionCircleOutlined} from '@ant-design/icons'
import './CategoryList.scss'
import Icon from './Icon'
import withContext from '../withContext'

class CategoryList extends Component {
  confirm() {
    Modal.confirm({
      title: '确定要删除该标签吗？',
      centered: true,
      icon: <QuestionCircleOutlined/>,
      okText: '确认',
      cancelText: '取消'
    })
  }

  toAddCategory = () => {
    this.props.history.push('/addCategory')
  }

  render() {
    const {type, data} = this.props
    let {categories} = data
    categories = categories.filter(item => item.type === type && item.name !== '编辑')
    return (
      <div className={'categoryList-wrapper'}>
        <ul className={'categoryList'}>
          <li onClick={this.toAddCategory}>
            <span>追加新的标签</span>
            <Icon name={'you'}/>
          </li>
          {
            categories.map((item, index) => {
              return (<li key={item.id}>
                <span className={'categoryList-item'}>
                  <Icon name={item.iconName}/>
                  <span>{item.name}</span>
                </span>
                <span onClick={this.confirm.bind(this)}>
                  <Icon name={'delete'}/>
                </span>
              </li>)
            })
          }
        </ul>
      </div>
    )
  }
}

export default withRouter(withContext(CategoryList))