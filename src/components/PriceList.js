import React, {Component} from 'react'
import PriceItem from './PriceItem'

class PriceList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {items} = this.props
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
          times.length ? times.map(item => {
            return <PriceItem key={item} time={item} list={list[item]}/>
          }) : '暂无记录'
        }
      </div>
    )
  }
}

export default PriceList