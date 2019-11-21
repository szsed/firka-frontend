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
    /*
    let canvas = document.querySelector('#canvas');
    let context = canvas.getContext('2d');
    let clickX = [];
    let clickY = [];
    let clickDrag = [];
    var ongoingTouches = [];
    let paint;
    
            canvas.addEventListener('mousedown', (event) => {
             let mouseX = event.offsetX;
             let mouseY = event.offsetY;
       
             paint = true;
             addClick(mouseX, mouseY);
             redraw();
           }, false);
    
        canvas.addEventListener('touchstart', (event) => {
          event.preventDefault();
          var el = document.getElementById("canvas");
          var ctx = el.getContext("2d");
          var touches = event.changedTouches;
    
          for (var i = 0; i < touches.length; i++) {
            ongoingTouches.push(copyTouch(touches[i]));
            var color = colorForTouch(touches[i]);
            ctx.beginPath();
            ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0, 2 * Math.PI, false);
            ctx.fillStyle = color;
            ctx.fill();
          }
        }, false)
    
            canvas.addEventListener('mousemove', (event) => {
              let mouseX = event.offsetX;
              let mouseY = event.offsetY;
              if (paint) {
                addClick(mouseX, mouseY, true);
                redraw();
              }
            }, false)
        
        canvas.addEventListener('touchmove', (event) => {
          let fingerX = event.touches[0].offsetX;
          let fingerY = event.touches[0].offsetY;
          if (paint) {
            addClick(fingerX, fingerY, true);
            redraw();
          }
          event.preventDefault();
        }, false)
    
            canvas.addEventListener('mouseup', (e) => {
              paint = false;
            }, false);
    
            canvas.addEventListener('touchend', (e) => {
              paint = false;
            }, false);
    
          canvas.addEventListener('mouseleave', (e) => {
            paint = false;
          }, false);
    
            canvas.addEventListener('touchcancel', (e) => {
              paint = false;
            }, false);
    
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
        }); */

    let canvas = document.querySelector('#canvas');
    let context = canvas.getContext('2d');
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    var start = function (coors) {
      context.beginPath();
      context.moveTo(coors.x, coors.y);
      this.isDrawing = true;
    };
    var move = function (coors) {
      if (this.isDrawing) {
        context.strokeStyle = "#fff";
        context.lineJoin = "round";
        context.lineWidth = 3;
        context.lineTo(coors.x, coors.y);
        context.stroke();
      }
    };
    var stop = function (coors) {
      if (this.isDrawing) {
        this.touchmove(coors);
        this.isDrawing = false;
      }
    };
    var drawer = {
      isDrawing: false,
      mousedown: start,
      mousemove: move,
      mouseup: stop,
      touchstart: start,
      touchmove: move,
      touchend: stop
    };
    var draw = function (e) {
      var coors = {
        x: e.clientX || e.targetTouches[0].pageX,
        y: e.clientY || e.targetTouches[0].pageY
      };
      drawer[e.type](coors);
    }
    canvas.addEventListener('mousedown', draw, false);
    canvas.addEventListener('mousemove', draw, false);
    canvas.addEventListener('mouseup', draw, false);
    canvas.addEventListener('touchstart', draw, false);
    canvas.addEventListener('touchmove', draw, false);
    canvas.addEventListener('touchend', draw, false);

    /*  var go = function (e) {
       this.parentNode.removeChild(this);
       draw(e);
     }; */

    /*   $('#go').addEventListener('mousedown', go, false);
      $('#go').addEventListener('touchstart', go, false); */

    // prevent elastic scrolling
    document.body.addEventListener('touchmove', function (e) {
      e.preventDefault();
    }, false);
    // end body:touchmove
    window.onresize = function (e) {
      canvas.width = document.body.clientWidth;
      canvas.height = document.body.clientHeight;
    };

  }

  render() {
    return (
      <>
        <canvas className="canvas" id="canvas" width={this.props.width} height={this.props.height}></canvas>
        <div className="colorButtons">
          {/*           <button id="red" className='colorButton'>Piros</button>
          <button id="yellow" className='colorButton'>Sárga</button>
          <button id="orange" className='colorButton'>Narancs</button>
          <button id="blue" className='colorButton'>Kék</button>
          <button id="green" className='colorButton'>Zöld</button>
          <button id="brown" className='colorButton'>Barna</button>
          <button id="black" className='colorButton'>Fekete</button> */}
        </div>
        <div className="sizeButtons">
          {/*           <button id="2" className='sizeButton'>Kicsi</button>
          <button id="5" className='sizeButton'>Közepes</button>
          <button id="10" className='sizeButton'>Nagy</button> */}
        </div>
      </>
    )
  }
}

export default Canvas
