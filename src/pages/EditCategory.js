import React, {Component, Fragment} from 'react'
import Header from '../components/Header'
import CategoryList from '../components/CategoryList'

class EditCategory extends Component {
  render() {
    const {type, onClickType} = this.props
    return (
      <Fragment>
        <Header type={type} onClickType={onClickType}/>
        <main className={'main-wrapper'}>
          <CategoryList type={type}/>
        </main>
      </Fragment>
    )
  }
}

export default EditCategory