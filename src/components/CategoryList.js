import React, {Component} from 'react'
import {Modal} from 'antd'
import {withRouter} from 'react-router-dom'
import {QuestionCircleOutlined} from '@ant-design/icons'
import './CategoryList.scss'

const categoies = [
  {
    icon: '',
    name: '饮食费'
  },
  {
    icon: '',
    name: '日用品'
  },
  {
    icon: '',
    name: '车票'
  },
  {
    icon: '',
    name: '住宿费'
  },
  {
    icon: '',
    name: '交际费'
  },
  {
    icon: '',
    name: '医疗费'
  },
  {
    icon: '',
    name: '水电费'
  },
  {
    icon: '',
    name: '交通费'
  },
  {
    icon: '',
    name: '饮食费'
  },
  {
    icon: '',
    name: '日用品'
  },
  {
    icon: '',
    name: '车票'
  },
  {
    icon: '',
    name: '住宿费'
  },
  {
    icon: '',
    name: '交际费'
  },
  {
    icon: '',
    name: '医疗费'
  },
  {
    icon: '',
    name: '水电费'
  },
  {
    icon: '',
    name: '交通费'
  }
]

class CategoryList extends Component {
  confirm() {
    Modal.confirm({
      title: '确定要删除该标签吗？',
      centered: true,
      icon: <QuestionCircleOutlined/>,
      okText: '确认',
      cancelText: '取消',
      okButtonProps: {background: '#61dafb'}
    })
  }

  toAddCategory = () => {
    this.props.history.push('/addCategory')
  }

  render() {
    return (
      <div className={'categoryList-wrapper'}>
        <ul className={'categoryList'}>
          <li onClick={this.toAddCategory}>
            <span>追加新的标签</span>
            <svg className={'icon'} aria-hidden={true}>
              <use xlinkHref={'#icon-you'}/>
            </svg>
          </li>
          {
            categoies.map((item, index) => {
              return (<li key={index}>
                <span className={'categoryList-item'}>
                  <svg className={'icon categoryList-item-icon'} aria-hidden={true}>
                    <use xlinkHref={'#icon-yinshi'}/>
                  </svg>
                  <span>{item.name}</span>
                </span>
                <svg className={'icon'} aria-hidden={true} onClick={this.confirm}>
                  <use xlinkHref={'#icon-delete'}/>
                </svg>
              </li>)
            })
          }
        </ul>
      </div>
    )
  }
}

export default withRouter(CategoryList)