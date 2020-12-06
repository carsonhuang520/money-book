import React from 'react'
import PriceItem from './PriceItem'
import {flatternItems} from '../utils'

function PriceList(props) {
  const {items, categories} = props
  let list = flatternItems(items)
  const times = Object.keys(list)
  return (
    <div className={'priceList-wrapper'}>
      {
        times.map(item => {
          return <PriceItem key={item} categories={categories} time={item} list={list[item]}/>
        })
      }
    </div>
  )
}

export default PriceList