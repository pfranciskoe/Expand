import React from 'react';
import CourseForm from './course_form';

class EditCourseForm extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCourse(this.props.course._id);
  }

  render() {
    return (
      <div>
        <CourseForm {...this.props} />
      </div>
    );
  }
}

export default EditCourseForm;
