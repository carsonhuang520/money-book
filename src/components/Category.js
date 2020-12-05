import React, {Component, Fragment} from 'react'
import {withRouter} from 'react-router-dom'
import withContext from '../withContext'
import './Category.scss'
import Icon from './Icon'

class Category extends Component {
  constructor(props) {
    super(props)
  }

  onClickItem = (item) => {
    if (item.name === '编辑') {
      this.props.history.push('/editCategory')
    }
    this.props.onClickItem(item)
  }


  render() {
    const {currentItem, categories} = this.props
    return (
      <Fragment>
        <p className={'category-label'}>{'分类'}</p>
        <div className={'category-wrapper'}>
          <ul className={'category-list'}>
            {
              categories.map((item) => {
                return (item.name !== '编辑' ? (
                  <li key={item.id} className={'category-item'} onClick={() => this.onClickItem(item)}>
                    <div className={`category-item-content ${item.id === currentItem.id ? 'active' : ''}`}>
                      <Icon name={item.iconName}/>
                      <span className={'category-item-content-name'}>
                    {item.name}
                  </span>
                    </div>
                  </li>) : (<li key={item.id} className={'category-item'} onClick={() => this.onClickItem(item)}>
                  <div className={`category-item-edit ${item.id === currentItem.id ? 'active' : ''}`}>
                      <span className={'category-item-content-name'}>
                        {item.name}
                      </span>
                    <Icon name={item.iconName}/>
                  </div>
                </li>))
              })
            }
          </ul>
        </div>
      </Fragment>
    )
  }

}

export default withRouter(withContext(Category))