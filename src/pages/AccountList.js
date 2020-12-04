import React, {Component, Fragment} from 'react'
import Header from '../components/Header'
import PriceList from '../components/PriceList'
import Calendar from '../components/Calendar'
import withContext from '../withContext'

class AccountList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      dateString: ''
    }
  }

  componentDidMount() {
    this.props.actions.initData()
  }

  onChangeDate = (date) => {
    this.setState({
      dateString: date
    })
    this.props.actions.getListByDate(date)
  }

  render() {
    const {dateString} = this.state
    const {type, onClickType, data} = this.props
    const {items} = data
    return (
      <Fragment>
        <header className={'header-wrapper'}>明细</header>
        <main className={'main-wrapper'}>
          <Calendar date={dateString} onChangeDate={this.onChangeDate}/>
          <PriceList items={items}/>
        </main>
      </Fragment>
    )
  }
}

export default withContext(AccountList)