import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Canvas from './Canvas';
import Firebase from '../services/firebase/firebase-services'

const timeToUpload = 11000;

class Display extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(this.uploadImage(), timeToUpload);
  }

  uploadImage = () => {
    let canvasData = document.querySelector('#canvas').toDataURL();
    Firebase.sendImageToFirestore(this.props.user, canvasData);
  }

  render() {
    return (
      <>
        <div className='display-info'>
          <section className='display-task'></section>
          <section className='display-time'></section>
        </div>
        <Canvas width={300} height={300} />
      </>
    )
  }

}

const mapStateToProps = ({ user_id }) => ({
  user: user_id,
});

Display.propTypes = {
  user: PropTypes.string,
  time: PropTypes.number,
  uploadImage: PropTypes.func,
};

export default connect(mapStateToProps)(Display);