import React, {Fragment} from 'react'
import {Input, DatePicker, Button} from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
import Category from './Category'
import './RecordForm.scss'

function RecordForm(props) {
  const {type} = props
  return (
    <Fragment>
      <div className={'form-wrapper'}>
        <ul className={'form-list'}>
          <li className={'form-item'}>
            <label className={'form-item-label'}>日期</label>
            <div className={'form-item-content'}>
              <DatePicker className={'form-item-input'} locale={locale}/>
            </div>
          </li>
          <li className={'form-item'}>
            <label className={'form-item-label'}>记录</label>
            <div className={'form-item-content'}>
              <Input className={'form-item-input'} placeholder="在这里输入备注" allowClear/>
            </div>
          </li>
          <li className={'form-item'}>
            {type === 'outcome' ? <label className={'form-item-label'}>支出</label> :
              <label className={'form-item-label'}>收入</label>}
            <div className={'form-item-content'}>
              <Input className={'form-item-input money'} value={0} allowClear/>
            </div>
          </li>
          <li className={'form-item'}>
            <Category type={type}/>
          </li>
        </ul>
      </div>
      <div className={'button-wrapper'}>
        <Button shape="round" className={'btn-create'}>记一笔</Button>
      </div>
    </Fragment>
  )
}

export default RecordForm