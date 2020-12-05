import React, {Component, Fragment} from 'react'
import {withRouter} from 'react-router-dom'
import withContext from '../withContext'
import './Category.scss'
import Icon from './Icon'

class IconList extends Component {
  constructor(props) {
    super(props)
  }

  onClickItem = (item) => {
    this.props.onClickItem(item)
  }


  render() {
    const {current, categories} = this.props
    return (
      <Fragment>
        <div className={'category-wrapper'}>
          <ul className={'category-list'}>
            {
              categories.map((item) => {
                return (
                  <li key={item.id} className={'category-item'} onClick={() => this.onClickItem(item)}>
                    <div className={`category-item-content newIcon ${item.id === current.id ? 'active' : ''}`}>
                      <Icon name={item.name}/>
                    </div>
                  </li>)
              })
            }
          </ul>
        </div>
      </Fragment>
    )
  }

}

export default withRouter(withContext(IconList))