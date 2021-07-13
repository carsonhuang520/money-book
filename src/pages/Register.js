import React, {Component} from 'react'
import {Button, Input} from 'antd'
import {withRouter} from 'react-router-dom'

import Icon from '../components/Icon'
import './Login.scss'
import {confirm, success, URL} from '../utils'
import {register} from '../api/user'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      isBtnLoading: false
    }
  }

  onLogin = () => {
    const {username, password} = this.state
    if (!username) {
      confirm('用户名不能为空!')
      return
    }
    if (!password) {
      confirm('密码不能为空!')
      return
    }
    this.setState({
      isBtnLoading: true
    })
    register({username, password}).then(res => {
      const {code, message} = res.data
      if (code === 0) {
        success('注册成功')
        this.props.history.push('/login')
      } else {
        success(message)
      }
      this.setState({
        isBtnLoading: false
      })
    }).catch(err => {
      console.log(err)
      this.setState({
        isBtnLoading: false
      })
    })
  }

  onNameChange = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  onPasswordChange = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  toLogin = () => {
    this.props.history.push('/login')
  }

  render() {
    const {username, password, isBtnLoading} = this.state
    return (
      <div className={'login-wrapper'}>
        <div className="logo">
          <Icon name="logo"/>
          <span>记账本</span>
        </div>
        <div className={'login-form'}>
          <ul className={'login-form-list'}>
            <li className={'login-form-item'}>
              <label className={'login-form-item-label'}>用户名：</label>
              <div className={'login-form-item-content'}>
                <Input className={'login-form-item-input'} placeholder="请输入用户名" value={username} allowClear
                       onChange={this.onNameChange}/>
              </div>
            </li>
            <li className={'login-form-item'}>
              <label className={'login-form-item-label'}>密码：</label>
              <div className={'login-form-item-content'}>
                <Input className={'login-form-item-input'} placeholder="请输入密码" type={'password'} value={password}
                       allowClear
                       onChange={this.onPasswordChange}/>
              </div>
            </li>
          </ul>
        </div>
        <div className={'login-wrapper'}>
          {
            !isBtnLoading
              ? <Button className={'login-btn'} shape="round" type="primary" onClick={this.onLogin}>注册</Button>
              : <Button className={'login-btn'} shape="round" type="primary" loading>加载中</Button>
          }
          <span className={'register-btn'} onClick={this.toLogin}>登录</span>
        </div>
      </div>
    )
  }
}

export default withRouter(Register)