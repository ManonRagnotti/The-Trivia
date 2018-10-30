import React, {
  Component
} from 'react';
import api from '../../helpers/api';
import Category from './Question';

class QuestionContainer extends Component {

  render() {
    console.log(this.props);
    return (
      <Category
        question={this.props.match.params.id}
      />
    );
  }
}

export default QuestionContainer;
