import React, { Component } from 'react';

class Canvas extends Component {

  componentDidMount() {
    let canvas = document.querySelector('#canvas');
    let context = canvas.getContext('2d');
    let clickX = [];
    let clickY = [];
    let clickDrag = [];
    let paint;

    canvas.addEventListener('mousedown', (event) => {
      let mouseX = event.offsetX;
      let mouseY = event.offsetY;

      paint = true;
      addClick(mouseX, mouseY);
      redraw();
    });

    canvas.addEventListener('mousemove', (event) => {
      let mouseX = event.offsetX;
      let mouseY = event.offsetY;
      if (paint) {
        addClick(mouseX, mouseY, true);
        redraw();
      }
    })

    canvas.addEventListener('mouseup', (e) => {
      paint = false;
    });

    canvas.addEventListener('mouseleave', (e) => {
      paint = false;
    });

    // const clearButton = document.querySelector('#clearButton') // not implemented
    // clearButton.addEventListener('click', () => {
    //   clickX = [];
    //   clickY = [];
    //   clickDrag = [];
    //   paint = false;
    //   context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    // })

    const strokeColor = "black";
    const strokeWidt = 5;
    const strokeJoin = "round";

    function addClick(x, y, dragging) {
      clickX.push(x);
      clickY.push(y);
      clickDrag.push(dragging);
    }

    function redraw() {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);

      context.strokeStyle = strokeColor;
      context.lineJoin = strokeJoin;
      context.lineWidth = strokeWidt;

      for (var i = 0; i < clickX.length; i++) {
        context.beginPath();
        if (clickDrag[i] && i) {
          context.moveTo(clickX[i - 1], clickY[i - 1]);
        } else {
          context.moveTo(clickX[i] - 1, clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        context.stroke();
      }
    }
  }

  render() {
    return (
      <>
        <canvas className="canvas" id="canvas" width={this.props.width} height={this.props.height}></canvas>
      </>
    )
  }
}

export default Canvas