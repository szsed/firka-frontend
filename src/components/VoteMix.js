import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Firebase from '../services/firebase/firebase-services'
import { Button, TextField, CardMedia } from '@material-ui/core';

const timeToChange = 10000;

class VoteMix extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tips =[]
    }
  }

  currentImgSource = '';
  currentImgIndex = 0;

  componentDidMount() {
    this.currentImgSource = this.props.images[currentImgIndex].source
    setTimeout(this.nextImage, timeToChange + 1000)
  }

  nextImage = () => {
    let word = document.querySelector('#tip').textContent
    let tip = { user: this.props.user, image: this.props.images[currentImgIndex].id, word: word }
    this.state.tips.push(tip)
    if (this.currentImgIndex < this.props.images.length) {
      this.currentImgIndex++
      this.currentImgSource = this.props.images[this.currentImgIndex].source
      setTimeout(this.nextImage, timeToChange)
    } else {
      this.callVote
    }
  }

  selector = () => { }

  render() {
    return (
      <>
        <CardMedia src={currentImg} />
        <Button>Nyomjad ha megvan!</Button>
      </>
    );
  }
}

const mapStateToProps = ({ images, user_id, }) => ({
  images: images,
  user: user_id,
});

Display.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      source: PropTypes.string,
    })
  ),
};

export default connect(mapStateToProps, mapActionsToProps)(VoteMix)