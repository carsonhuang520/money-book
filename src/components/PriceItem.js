import React from 'react'
import './PriceList.scss'
import Icon from './Icon'
import {flatternCategory, getTotal, toThousandFilter} from '../utils'

function PriceItem(props) {
  const {time, list, categories} = props
  const categoriesFlattern = flatternCategory(categories)
  const total = getTotal(list, categoriesFlattern)
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

export default PriceItem