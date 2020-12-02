import React, {Component, Fragment} from 'react'
import Header from '../components/Header'
import PriceList from '../components/PriceList'
import Calendar from '../components/Calendar'

class AccountList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {type, onClickType} = this.props
    return (
      <Fragment>
        <Header type={type} onClickType={onClickType}/>
        <main className={'main-wrapper'}>
          <Calendar/>
          <PriceList/>
        </main>
      </Fragment>
    )
  }
}

export default AccountList