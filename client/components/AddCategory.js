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
    categories: state.categories
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
    return (
      <div className="verticalForm">
        <h3>Add a new category!</h3>
        <CategoryFormRedux handleSubmit={this.add} form={'category'} />
      </div>
    )
  }
}

const ConnectedNewCategory = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewCategory)
)

export default ConnectedNewCategory
