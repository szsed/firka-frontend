import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, TextField, CardMedia } from '@material-ui/core';

const timeToChange = 10000;

class TippMix extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tips =[]
    }
  }

  componentDidMount() {
    this.currentImgSource = this.imageArray[currentImgIndex].source
    setTimeout(this.nextImage, timeToChange + 1000)
  }

  currentImgSource = '';
  currentImgIndex = 0;

  imageArray = this.imageArray.filter(element => {
    if (element.user !== this.props.user) {
      return element
    }
  })

  nextImage = () => {
    let word = document.querySelector('#tip').textContent
    let tip = { user: this.props.user, image: this.imageArray[currentImgIndex].id, word: word }
    this.state.tips.push(tip)
    if (this.currentImgIndex < this.imageArray.length) {
      this.currentImgIndex++
      this.currentImgSource = this.imageArray[this.currentImgIndex].source
      setTimeout(this.nextImage, timeToChange)
    } else {
      this.callVote
    }
  }

  render() {
    return (
      <>
        <CardMedia src={currentImg} />
        <TextField type="text" id="tip" />
        <Button>Nyomjad ha megvan!</Button>
      </>
    );
  }
}

const mapStateToProps = ({ images, user, }) => ({
  images: images,
  user: user.id,
});

const mapActionsToProps = {
  changeGame: changeGameAction,
}

Display.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      source: PropTypes.string,
    })
  ),
};

export default connect(mapStateToProps, mapActionsToProps)(TippMix)