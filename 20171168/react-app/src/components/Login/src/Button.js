import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
export class TextButtons extends React.Component {
  render(){
      const classes = this.props;
  return (
    <div>
      <Button color="primary"  onClick={classes.onChangeDoctor}>
       Doctor
      </Button>
      <Button color="primary" className={classes.button} onClick={this.props.onChangeTeacher}>
        Teacher
      </Button>
      <Button color="primary" className={classes.button} onClick={this.props.onChangeStudent}>
        Student
      </Button>
    </div>
  );
}
}
