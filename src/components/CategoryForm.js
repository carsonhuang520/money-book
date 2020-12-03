import React from 'react'
import Category from './Category'
import {Button, Input} from 'antd'

function CategoryForm(props) {
  return (
    <div className={'form-wrapper'}>
      <ul className={'form-list'}>
        <li className={'form-item'}>
          <label className={'form-item-label'}>名字</label>
          <div className={'form-item-content'}>
            <Input className={'form-item-input'} placeholder="请输入标签名" allowClear/>
          </div>
        </li>
        <li className={'form-item'}>
          <Category label={'图标'} type={props.type}/>
        </li>
      </ul>
      <div className={'button-wrapper'}>
        <Button shape="round" className={'btn-create'}>确定</Button>
      </div>
    </div>
  )
}

export default CategoryForm