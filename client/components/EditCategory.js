import React from 'react'
import CategoryFormRedux from './CategoryFormRedux'

import {
  updateCategoryToServer,
  getCategoriesFromServer,
  deleteCategoryFromServer
} from '../store/category'

import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

const mapDispatchToProps = dispatch => {
  return {
    getCategories: () => dispatch(getCategoriesFromServer()),
    updateCategory: categoryInfo =>
      dispatch(updateCategoryToServer(categoryInfo)),
    deleteCategory: categoryId => dispatch(deleteCategoryFromServer(categoryId))
  }
}

const mapStateToProps = state => {
  return {
    categories: state.category,
    user: state.user
  }
}

class UpdateCategory extends React.Component {
  componentDidMount() {
    this.props.getCategories()
  }
  handleDelete = async categoryId => {
    await this.props.deleteCategory(categoryId)
  }
  update = (evt, key) => {
    const categoryId = key
    evt.preventDefault()
    const categoryInfo = {
      id: categoryId,
      name: evt.target.elements.name.value
    }

    this.props.updateCategory(categoryInfo)
    this.props.history.push('/products')
  }

  render() {
    if (this.props.categories.length && this.props.user.isAdmin) {
      return (
        <div>
          <br />
          <h2 className="ui one column stackable center aligned page grid">Update Categories</h2>
          <br />
          <br />
          <br />
          {this.props.categories.map(category => {
            return (
              <div key={category.id}>
                <CategoryFormRedux
                  key={category.id}
                  form={category.id.toString()}
                  initialValues={category}
                  handleSubmit={this.update}
                  establishReinitialize={true}
                />
              <br />
              <br />
              <div className="ui one column stackable center aligned page grid">
                <button
                  className="ui red basic mini button"
                  onClick={() => this.handleDelete(category.id)}
                >
                  Delete
                </button>
              </div>
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
            )
          })}
        </div>
      )
    } else {
      return <h1>Sorry, you are not authorized to view this page</h1>
    }
  }
}

const ConnectedUpdateCategory = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UpdateCategory)
)
export default ConnectedUpdateCategory
