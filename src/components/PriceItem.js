import React, {Component} from 'react'
import withContext from '../withContext'
import './PriceList.scss'
import Icon from './Icon'
import {toThousandFilter} from '../utils'

function PriceItem(props) {
  const {time, list, data, categories} = props
  // const {categories} = data
  const categoriesFlattern = categories.reduce((prev, item) => {
    prev[item.id] = item
    return prev
  }, {})
  const total = list.reduce((prev, cur) => {
    prev = prev + (categoriesFlattern[cur.cid].type === 'outcome' ? -1 * cur.price : cur.price)
    return prev
  }, 0)
  return (
    <div className={'priceItem-wrapper'}>
      <h3 className={'priceItem-header'}>
        <span className={'priceItem-header-time'}>{time}</span>
        <span
          className={`priceItem-header-price ${total > 0 ? 'profit' : 'deficit'}`}>
          {total > 0 ? '+' + toThousandFilter(total) : toThousandFilter(total)}
        </span>
      </h3>
      <ul className={'priceItem-list'}>
        {
          list.map(item => {
            return (<li key={item.id} className={'priceItem-item'}>
              <span>
                <Icon name={categoriesFlattern[item.cid].iconName}/>
                <span>{item.name}</span>
              </span>
              <span>
                {(categoriesFlattern[item.cid].type === 'outcome' ? '-' : '+') + toThousandFilter(item.price)}
              </span>
            </li>)
          })
        }
      </ul>
    </div>
  )
}

export default withContext(PriceItem)