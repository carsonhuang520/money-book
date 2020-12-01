import './App.css'
import React, {Component, Fragment} from 'react'
import Header from './components/Header'
import Nav from './components/Nav'
import RecordForm from './components/RecordForm'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'outcome'
    }
  }

  onClickType = (type) => {
    this.setState({
      type: type
    })
  }

  render() {
    const {type} = this.state
    return (
      <Fragment>
        <Header type={type} onClickType={this.onClickType}/>
        <main className={'main-wrapper'}><RecordForm type={type}/></main>
        <Nav/>
      </Fragment>
    )
  }


}

export default App
