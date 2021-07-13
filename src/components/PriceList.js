import React from 'react'

import PriceItem from './PriceItem'

function PriceList(props) {
  const {items, onDeleteItem} = props
  const times = [...new Set(items.map(item => item.time))]
  let obj = {}
  obj = times.reduce((prev, item) => {
    if (!prev[item]) {
      prev[item] = []
    }
    items.forEach(e => {
      if (e.time === item) {
        prev[item].push(e)
      }
    })
    return prev
  }, {})
  return (
    <div className={'priceList-wrapper'}>
      {
        times.map(item => {
          return <PriceItem key={item} time={item} list={obj[item]}
                            onDeleteItem={(item) => onDeleteItem(item)}
          />
        })
      }
    </div>
  )
}

export default PriceList