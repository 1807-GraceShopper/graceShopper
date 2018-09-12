import React from 'react'
import CategoryFormRedux from './CategoryFormRedux'

import {
  updateCategoryToServer,
  getCategoriesFromServer
} from '../store/category'

import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

const mapDispatchToProps = dispatch => {
  return {
    getCategories: () => dispatch(getCategoriesFromServer()),
    updateCategory: categoryInfo =>
      dispatch(updateCategoryToServer(categoryInfo))
  }
}

const mapStateToProps = state => {
  return {
    categories: state.category
  }
}

class UpdateCategory extends React.Component {
  componentDidMount() {
    this.props.getCategories()
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
    if (this.props.categories.length) {
      return (
        <div>
          <h3 className="listHeader center">Update Categories</h3>
          {this.props.categories.map(category => {
            return (
              <CategoryFormRedux
                key={category.id}
                form={category.id.toString()}
                initialValues={category}
                handleSubmit={this.update}
                establishReinitialize={true}
              />
            )
          })}
        </div>
      )
    } else {
      return null
    }
  }
}

const ConnectedUpdateCategory = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UpdateCategory)
)
export default ConnectedUpdateCategory
