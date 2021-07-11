import React from 'react'
import './Category.scss'
import Icon from './Icon'

function IconList(props) {
  const {current, categories, onClickItem} = props
  return (
    <div className={'category-wrapper'}>
      <ul className={'category-list'}>
        {
          categories.map((item) => {
            return (
              <li key={item.id} className={'category-item'} onClick={() => onClickItem(item)}>
                <div className={`category-item-content newIcon ${item.id === current.id ? 'active' : ''}`}>
                  <Icon name={item.iconName}/>
                </div>
              </li>)
          })
        }
      </ul>
    </div>
  )
}

export default IconList