import React, { Component } from 'react';
import Canvas from './Canvas';
import Firebase from '../services/firebase/firebase-services'

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canvas: ''
    };
  }

  componentDidMount() {
    let canvasData = document.querySelector('#canvas').toDataURL();
    setTimeout(uploadImage(canvasData), this.props.time)
  }

  uploadImage = (canvasData) => {
    Firebase.sendImageToFirestore(userid, canvasData)
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

export default Display