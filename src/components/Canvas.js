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


    /*     const clearButton = document.querySelector('#clearButton') // not implemented
        clearButton.addEventListener('click', () => {
          clickX = [];
          clickY = [];
          clickDrag = [];
          paint;
          context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        }) */


    const strokeColor = "black";
    const strokeWidt = 5;
    const strokeJoin = "round";

    function addClick(x, y, dragging) {
      clickX.push(x);
      clickY.push(y);
      clickDrag.push(dragging);
      clickColor.push(currentColor);
      clickSize.push(curSize);
    }

    function redraw() {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      context.strokeStyle = strokeColor; //remove if color chooser is implemented
      context.lineJoin = strokeJoin;
      context.lineWidth = strokeWidt; //remove if size chooser is implemented

      for (var i = 0; i < clickX.length; i++) {
        context.beginPath();
        if (clickDrag[i] && i) {
          context.moveTo(clickX[i - 1], clickY[i - 1]);
        } else {
          context.moveTo(clickX[i] - 1, clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        //context.strokeStyle = clickColor[i];
        //context.lineWidth = clickSize[i];
        context.stroke();
      }
    }

    //color changer

    let colorButton = document.querySelectorAll('#colorButton');
    let currentColor = 'black';
    let clickColor = new Array();

    colorButton.forEach(function (button) {
      button.addEventListener('click', function (e) {
        currentColor = button.innerHTML;
      })
    });


    //size chooser

    let sizeButton = document.querySelectorAll('#sizeButton');
    let clickSize = new Array();
    let curSize = 5;

    sizeButton.forEach(function (button) {
      button.addEventListener('click', function (e) {
        curSize = Number(button.className);
      })
    });

  }

  render() {
    return (
      <>
        <canvas className="canvas" id="canvas" width={this.props.width} height={this.props.height}></canvas>
        {/*  <button id="colorButton">Black</button> */}
        {/* <button id="colorButton">Green</button> */}
        {/* <button id="sizeButton" className='2'>Small</button> */}
        {/* <button id="sizeButton" className='5'>Medium</button> */}
        {/* <button id="sizeButton" className='10'>Large</button> */}
      </>
    )
  }
}

export default Canvas