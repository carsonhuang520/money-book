import React, {Component, Fragment} from 'react'
import Header from '../components/Header'
import RecordForm from '../components/RecordForm'
import withContext from '../withContext'

class CreateAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // type: props.type
    }
  }

  componentDidMount() {
    this.props.actions.initData()
  }

  render() {
    const {type, onClickType} = this.props
    return (
      <Fragment>
        <Header type={type} onClickType={onClickType}/>
        <main className={'main-wrapper'}><RecordForm type={type}/></main>
      </Fragment>
    )
  }
}

export default withContext(CreateAccount)