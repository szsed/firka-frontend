import React, { Component } from 'react';
import styles from './styles.css';

class Canvas extends Component {
  /* constructor(props) {
    super(props);
    this.state = {
      canvas: document.querySelector('#canvas'),
      context: canvas.getContext('2d'),
      clickX: [],
      clickY: [],
      clickDrag: [],
      ongoingTouches: [],
      paint: false,
    };
  } */

  componentDidMount() {
    let canvas = document.querySelector('#canvas');
    let context = canvas.getContext('2d');
    let clickX = [];
    let clickY = [];
    let clickDrag = [];
    let ongoingTouches = [];
    let paint;


    function colorForTouch(touch) {
      var r = touch.identifier % 16;
      var g = Math.floor(touch.identifier / 3) % 16;
      var b = Math.floor(touch.identifier / 7) % 16;
      r = r.toString(16); // make it a hex digit
      g = g.toString(16); // make it a hex digit
      b = b.toString(16); // make it a hex digit
      let color = "#" + r + g + b;
      return color;
    }

    function copyTouch({ identifier, pageX, pageY }) {
      return { identifier, pageX, pageY };
    }

    function ongoingTouchIndexById(idToFind) {
      for (let i = 0; i < ongoingTouches.length; i++) {
        let id = ongoingTouches[i].identifier;
        if (id == idToFind) {
          return i;
        }
      }
      return -1;    // not found
    }

    /*    canvas.addEventListener('mousedown', (event) => {
         let mouseX = event.offsetX;
         let mouseY = event.offsetY;
   
         paint = true;
         addClick(mouseX, mouseY);
         redraw();
       }, false); */

    function handleStart(event) {
      event.preventDefault();
      let touches = event.changedTouches;

      for (let i = 0; i < touches.length; i++) {
        ongoingTouches.push(copyTouch(touches[i]));
        //let color = colorForTouch(touches[i]);
        //context.beginPath();
        //context.arc(touches[i].pageX - touches[i].target.offsetLeft, touches[i].pageY - touches[i].target.offsetTop, 4, 0, 2 * Math.PI, false);  // a circle at the start
        //context.fillStyle = color;
        //context.fill();
      }
    }

    canvas.addEventListener('touchstart', handleStart, false)

    /*    canvas.addEventListener('mousemove', (event) => {
         let mouseX = event.offsetX;
         let mouseY = event.offsetY;
         if (paint) {
           addClick(mouseX, mouseY, true);
           redraw();
         }
       }, false) */

    function handleMove(event) {
      event.preventDefault();
      let touches = event.changedTouches;

      for (let i = 0; i < touches.length; i++) {
        let color = colorForTouch(touches[i]);
        let idx = ongoingTouchIndexById(touches[i].identifier);

        if (idx >= 0) {
          context.beginPath();
          context.moveTo(ongoingTouches[idx].pageX - ongoingTouches[idx].target.offsetLeft, ongoingTouches[idx].pageY - ongoingTouches[idx].target.offsetTop);
          context.lineTo(touches[i].pageX - touches[i].target.offsetLeft, touches[i].pageY - touches[i].target.offsetTop);
          context.lineWidth = 4;
          context.strokeStyle = color;
          context.stroke();

          ongoingTouches.splice(idx, 1, copyTouch(touches[i]));  // swap in the new touch record
        } else {
          console.log("can't figure out which touch to continue");
        }
      }
    }

    canvas.addEventListener('touchmove', handleMove, false)

    /*    canvas.addEventListener('mouseup', (e) => {
         paint = false;
       }, false);
    */

    function handleEnd(event) {
      event.preventDefault();
      let touches = event.changedTouches;

      for (let i = 0; i < touches.length; i++) {
        let color = colorForTouch(touches[i]);
        let idx = ongoingTouchIndexById(touches[i].identifier);

        if (idx >= 0) {
          context.lineWidth = 4;
          context.fillStyle = color;
          context.beginPath();
          context.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
          context.lineTo(touches[i].pageX, touches[i].pageY);
          context.fillRect(touches[i].pageX - 4, touches[i].pageY - 4, 8, 8);  // and a square at the end
          ongoingTouches.splice(idx, 1);  // remove it; we're done
        } else {
          console.log("can't figure out which touch to end");
        }
      }
    }

    canvas.addEventListener('touchend', handleEnd, false);

    /*    canvas.addEventListener('mouseleave', (e) => {
         paint = false;
       }, false); */

    function handleCancel(event) {
      event.preventDefault();
      let touches = event.changedTouches;

      for (let i = 0; i < touches.length; i++) {
        let idx = ongoingTouchIndexById(touches[i].identifier);
        ongoingTouches.splice(idx, 1);  // remove it; we're done
      }
    }

    canvas.addEventListener('touchcancel', handleCancel, false);

    /*     const strokeColor = "black";
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
        }); */

  }

  render() {
    return (
      <>
        <canvas className="canvas" id="canvas" width={this.props.width} height={this.props.height}></canvas>
        <div className="colorButtons">
          {/*  <button id="red" className='colorButton'>Piros</button>
          <button id="yellow" className='colorButton'>Sárga</button>
          <button id="orange" className='colorButton'>Narancs</button>
          <button id="blue" className='colorButton'>Kék</button>
          <button id="green" className='colorButton'>Zöld</button>
          <button id="brown" className='colorButton'>Barna</button>
          <button id="black" className='colorButton'>Fekete</button> */}
        </div>
        <div className="sizeButtons">
          {/* <button id="2" className='sizeButton'>Kicsi</button>
          <button id="5" className='sizeButton'>Közepes</button>
          <button id="10" className='sizeButton'>Nagy</button> */}
        </div>
      </>
    )
  }
}

export default Canvas
