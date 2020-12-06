import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import './CategoryList.scss'
import Icon from './Icon'
import withContext from '../withContext'
import {confirm} from '../utils'

class CategoryList extends Component {
  toAddCategory = () => {
    this.props.history.push('/addCategory')
  }

  render() {
    let {categories, onDeleteCategory} = this.props
    const isEmpty = categories.length
    return (
      <div className={'categoryList-wrapper'}>
        <ul className={'categoryList'}>
          <li onClick={this.toAddCategory}>
            <span>追加新的标签</span>
            <Icon name={'you'}/>
          </li>
          {
            isEmpty ? categories.map((item, index) => {
              return (<li key={item.id}>
                <span className={'categoryList-item'}>
                  <Icon name={item.iconName}/>
                  <span>{item.name}</span>
                </span>
                <span onClick={() => confirm('确定要删除该标签吗？', () => onDeleteCategory(item))}>
                  <Icon name={'delete'}/>
                </span>
              </li>)
            }) : '暂无标签'
          }
        </ul>
      </div>
    )
  }
}

export default withRouter(withContext(CategoryList))