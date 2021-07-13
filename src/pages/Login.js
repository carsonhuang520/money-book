import React, {Component} from 'react'
import {Button, Input} from 'antd'
import {withRouter} from 'react-router-dom'

import Icon from '../components/Icon'
import './Login.scss'
import {confirm, error, success} from '../utils'
import {login} from '../api/user'
import {setAuthToken} from '../localStorage'

class Login extends Component {
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
    login({username, password}).then(res => {
      const {code, data, message} = res.data
      if (code === 0) {
        success('登录成功')
        setAuthToken(data.token)
        this.props.history.push('/')
      } else {
        error(message)
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

  toRegister = () => {
    this.props.history.push('/register')
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
              ? <Button className={'login-btn'} shape="round" type="primary" onClick={this.onLogin}>登录</Button>
              : <Button className={'login-btn'} shape="round" type="primary" loading>加载中</Button>
          }
          <span className={'register-btn'} onClick={this.toRegister}>注册</span>
        </div>
      </div>
    )
  }
}

export default withRouter(Login)