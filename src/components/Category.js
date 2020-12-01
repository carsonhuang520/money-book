import React, {Component, Fragment} from 'react'
import './Category.scss'

const outComeCategories = ['购物', '饮食', '购物', '饮食', '购物', '饮食', '购物',
  '饮食', '购物', '饮食', '购物', '饮食', '购物', '饮食', '购物', '饮食', '购物', '饮食', '编辑']
const inComeCategories = ['工资', '兼职', '编辑']

class Category extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0
    }
  }

  onClickItem = (index) => {
    this.setState({
      current: index
    })
  }


  render() {
    const {current} = this.state
    const {type} = this.props
    const categories = type === 'outcome' ? outComeCategories : inComeCategories
    return (
      <Fragment>
        <p className={'category-label'}>分类</p>
        <div className={'category-wrapper'}>
          <ul className={'category-list'}>
            {
              categories.map((item, index) => {
                return (item !== '编辑' ?
                  <li key={index} className={'category-item'} onClick={() => this.onClickItem(index)}>
                    <div className={`category-item-content ${index === current ? 'active' : ''}`}>
                      <svg className={`icon category-item-content-icon ${current === index ? 'active' : ''}`}
                           aria-hidden="true">
                        <use xlinkHref="#icon-yinshi"/>
                      </svg>
                      <span className={'category-item-content-name'}>
                    {item}
                  </span>
                    </div>
                  </li> : <li key={index} className={'category-item'} onClick={() => this.onClickItem(index)}>
                    <div className={`category-item-edit ${index === current ? 'active' : ''}`}>
                  <span className={'category-item-content-name'}>
                    {item}
                  </span>
                      <svg className="icon category-item-content-icon" aria-hidden="true">
                        <use xlinkHref="#icon-you"/>
                      </svg>
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

export default Category