import React, { Component } from 'react';
import styles from './styles.css';

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

    canvas.addEventListener('touchstart', (event) => {
      event.preventDefault()
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

    canvas.addEventListener('touchmove', (event) => {
      event.preventDefault()
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

    canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      paint = false;
    });

    canvas.addEventListener('mouseleave', (e) => {
      paint = false;
    });

    canvas.addEventListener('touchcancel', (e) => {
      e.preventDefault();
      paint = false;
    });

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
        context.strokeStyle = clickColor[i];
        context.lineWidth = clickSize[i];
        context.stroke();
      }
    }

    let colorButton = document.querySelectorAll('.colorButton');
    let currentColor = 'black';
    let clickColor = new Array();

    colorButton.forEach(function (button) {
      button.addEventListener('click', function (e) {
        currentColor = button.id;
      })
    });


    let sizeButtons = document.querySelectorAll('.sizeButton');
    let clickSize = new Array();
    let curSize = 5;

    sizeButtons.forEach(function (button) {
      button.addEventListener('click', function (e) {
        curSize = Number(button.id);
      })
    });

  }

  render() {
    return (
      <>
        <canvas className="canvas" id="canvas" width={this.props.width} height={this.props.height}></canvas>
        <div className="colorButtons">
          <button id="red" className='colorButton'>Piros</button>
          <button id="yellow" className='colorButton'>Sárga</button>
          <button id="orange" className='colorButton'>Narancs</button>
          <button id="blue" className='colorButton'>Kék</button>
          <button id="green" className='colorButton'>Zöld</button>
          <button id="brown" className='colorButton'>Barna</button>
          <button id="black" className='colorButton'>Fekete</button>
        </div>
        <div className="sizeButtons">
          <button id="2" className='sizeButton'>Kicsi</button>
          <button id="5" className='sizeButton'>Közepes</button>
          <button id="10" className='sizeButton'>Nagy</button>
        </div>
      </>
    )
  }
}

export default Canvas
