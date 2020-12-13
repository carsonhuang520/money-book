import React, {Component} from 'react'
import {Button, Empty} from 'antd'
import {withRouter} from 'react-router-dom'

class EmptyData extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Empty
        imageStyle={{
          height: 60,
        }}
        description={
          <span style={{color: 'lightgrey'}}>
          暂无数据
        </span>
        }
      >
        <Button type="primary" onClick={() => this.props.history.push('/')}>
          记一笔
        </Button>
      </Empty>
    )
  }
}

export default withRouter(EmptyData)