import React, {Component} from 'react'
import './PriceList.scss'
import Icon from './Icon'
import {confirm, flatternCategory, getTotal, toThousandFilter} from '../utils'

class PriceItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isClick: false,
      current: -1,
      startX: 0,
      endX: 0
    }
  }

  onLiClick(e) {
    const {isClick} = this.state
    if (e.target.innerText !== '删除') {
      if (isClick) {
        this.setState({
          isClick: false
        })
      }
    }
  }

  onTouchStart(e) {
    this.setState({
      startX: e.touches[0].clientX
    })
  }

  onTouchEnd(e, index) {
    const {startX, current, isClick} = this.state
    const endX = e.changedTouches[0].clientX
    this.setState({
      endX: endX
    })
    if (startX - endX > 30) {
      if (isClick && current !== index) {
        this.setState({
          isClick: false
        })
        return
      }
      this.setState({
        current: index,
        isClick: true
      })
    } else if (startX - endX < -30) {
      this.setState({
        isClick: false
      })
    }
  }

  render() {
    const {time, list, onDeleteItem} = this.props
    const {isClick, current} = this.state
    const total = list.reduce((prev, item) => {
      if (item.type === 'outcome') {
        prev -= item.price
      } else {
        prev += item.price
      }
      return prev
    }, 0)
    return (
      <div className={'priceItem-wrapper'}>
        <h3 className={'priceItem-header'}>
          <span className={'priceItem-header-time'}>{time}</span>
          <span className={`priceItem-header-price ${total > 0 ? 'profit' : 'deficit'}`}>
            {total > 0 ? '+' + toThousandFilter(total) : toThousandFilter(total)}
          </span>
        </h3>
        <ul className={'priceItem-list'}>
          {
            list.map((item, index) => {
              return (
                <li key={item.accountId} className={`priceItem-item ${isClick && current === index ? 'active' : ''}`}
                    onTouchStart={(e) => this.onTouchStart(e)}
                    onTouchEnd={(e) => this.onTouchEnd(e, index)}
                    onClick={(e) => this.onLiClick(e)}>
                  <div className={`priceItem-item-content`}>
                    <span>
                      <Icon name={item.iconName}/>
                      <span>{item.categoryName}</span>
                    </span>
                    <span>
                      {(item.type === 'outcome' ? '-' : '+') + toThousandFilter(item.price)}
                    </span>
                  </div>
                  <div className={`priceItem-item-del`}
                       onClick={() => confirm('确定要删除该条记录吗？', () => onDeleteItem(item))}
                  >
                    删除
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }

}

export default PriceItem