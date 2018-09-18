import React from 'react'
import {connect} from 'react-redux'
import {postCategoryToServer} from '../store/category'
import CategoryFormRedux from './CategoryFormRedux'
import {withRouter} from 'react-router-dom'

const mapDispatchToProps = dispatch => {
  return {
    addCategory: category => dispatch(postCategoryToServer(category))
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    user: state.user
  }
}

class NewCategory extends React.Component {
  add = evt => {
    const categoryId = this.props.match.params.id
    evt.preventDefault()
    const categoryInfo = {
      id: categoryId,
      name: evt.target.elements.name.value
    }

    this.props.addCategory(categoryInfo)
    this.props.history.push('/products')
  }
  render() {
    if (this.props.user.isAdmin) {
      return (
        <div className="ui form">
        <br />
          <h2 className="ui one column stackable center aligned page grid">Add a new category!</h2>
          <br />
          <br />
          <CategoryFormRedux handleSubmit={this.add} form={'category'} />
        </div>
      )
    } else {
      return <h1>Sorry, you are not authorized to view this page</h1>
    }
  }
}

const ConnectedNewCategory = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewCategory)
)

export default ConnectedNewCategory
