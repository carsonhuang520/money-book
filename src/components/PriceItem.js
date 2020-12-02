import React, {Component} from 'react'
import './PriceList.scss'

function PriceItem(props) {
  const {time, list} = props
  const total = list.reduce((prev, cur) => {
    prev = prev + (cur.type === 'outcome' ? -1 * cur.price : cur.price)
    return prev
  }, 0)
  return (
    <div className={'priceItem-wrapper'}>
      <h3 className={'priceItem-header'}>
        <span className={'priceItem-header-time'}>{time}</span>
        <span className={`priceItem-header-price ${total > 0 ? 'profit' : 'deficit'}`}>{total}</span>
      </h3>
      <ul className={'priceItem-list'}>
        {
          list.length && list.map(item => {
            return (<li key={item.id} className={'priceItem-item'}>
              <span>
                <svg className={`icon priceItem-item-icon`} aria-hidden="true">
                  <use xlinkHref="#icon-yinshi"/>
                </svg>
                <span>{item.name}</span>
              </span>
              <span>{(item.type === 'outcome' ? '-' : '+') + item.price}</span>
            </li>)
          })
        }
      </ul>
    </div>
  )
}

export default PriceItem