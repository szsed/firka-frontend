import React, { Component } from 'react';

class Countdown extends Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 10 };
    this.timer = null;
  }

  componentDidMount() {
    this.startTimer()
  }

  startTimer() {
    if (!this.timer && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown = () => {
    let seconds = this.state.seconds - 1;
    this.setState({
      seconds: seconds
    });

    if (seconds <= 0) {
      clearInterval(this.timer);
    }
  }

  render() {
    return (
      <div>
        {this.state.seconds}
      </div>
    );
  }
}

export default Countdown;
