import React, { Component } from 'react';
import api from '../../helpers/api';
import Category from './Category';

class CategoryContainer extends Component {
    state = {
        category: null,
    }
    async componentDidMount() {
        const data = await api.getCategoryById(this.props.match.params.id);
        console.log('data' , data);
        const categoryName = data.title;
        console.log(categoryName);
        const questions = data.clues.question;
        console.log(questions);

        this.setState({
            category: data,
            categoryName: categoryName,
            questions : questions
        });
    }

    render() {
        console.log(this.props);
        return (
            <Category
                categoryName={this.state.categoryName}
                questions={this.state.questions}
            />
        );
    }
}

export default CategoryContainer;
