import React, {Component, Fragment} from 'react'
import Header from '../components/Header'
import CategoryForm from '../components/CategoryForm'
import axios from 'axios'

class CreateCategory extends Component {


  render() {
    const {type, onClickType} = this.props
    return (
      <Fragment>
        <Header type={type} onClickType={onClickType}/>
        <main className={'main-wrapper'}>
          <CategoryForm type={type}/>
        </main>
      </Fragment>
    )
  }
}

export default CreateCategory