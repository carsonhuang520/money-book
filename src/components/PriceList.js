import React, {Component} from 'react'
import PriceItem from './PriceItem'
import withContext from '../withContext'
import EmptyData from './EmptyData'

class PriceList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {items, categories} = this.props
    let list = {}
    items.forEach(item => {
      if (!list[item.date]) {
        list[item.date] = []
      }
      list[item.date].push(item)
    })
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
}

export default withContext(PriceList)