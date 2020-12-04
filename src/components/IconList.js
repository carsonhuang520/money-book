import React, {Component, Fragment} from 'react'
import {withRouter} from 'react-router-dom'
import withContext from '../withContext'
import './Category.scss'
import Icon from './Icon'

class IconList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 1
    }
  }

  onClickItem = (item) => {
    this.setState({
      current: item.id
    })
  }


  render() {
    const {current} = this.state
    const {type, categories} = this.props
    // categories = categories.filter(item => item.type === type)
    return (
      <Fragment>
        <div className={'category-wrapper'}>
          <ul className={'category-list'}>
            {
              categories.map((item) => {
                return (
                  <li key={item.id} className={'category-item'} onClick={() => this.onClickItem(item)}>
                    <div className={`category-item-content newIcon ${item.id === current ? 'active' : ''}`}>
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