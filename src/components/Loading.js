import React from 'react'
import {Spin} from 'antd'
import {LoadingOutlined} from '@ant-design/icons'

const antIcon = <LoadingOutlined style={{fontSize: 36, color: '#61dafb'}} spin/>

function Loading(props) {
  return (
    <Spin style={{marginTop: '60px', color: '#61dafb'}} indicator={antIcon} tip={'加载中...'}/>
  )
}

export default Loading