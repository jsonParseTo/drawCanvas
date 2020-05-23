import React from 'react';
// canvas跟其他标签一样，也可以通过css来定义样式。
// 但这里需要注意的是：canvas的默认宽高为300px * 150px,在css中为canvas定义宽高，实际上把宽高为300px * 150px的画布进行了拉伸。
// 如果在这样的情况下进行canvas绘图，你得到的图形可能就是变形的效果。
// 所以，在canvas绘图时，应该在canvas标签里直接定义宽高。
class DrawSignature extends React.Component {
  constructor(props) {
    super(props);
    this.clearWidth = parseInt(props.clearWidth, 10) || 20; // 橡皮擦的擦拭范围，值越大擦的越多
    this.canvasHistory = []; // 每次绘制完都存一份快照，撤销时需要用到
    this.canvasRef = React.createRef();
    this.isDrawing = false; // 是否为绘制状态，ture：是，false：不是（默认值）
    this.state = {
      isClearing: false, // 是否为橡皮擦状态, ture：是，false：不是（默认值）
    };
  }

  componentDidMount() {
    this.ctx = this.canvasRef.current.getContext('2d');

    this.ctx.fillStyle = "#ccc";
    this.ctx.fillRect(0, 0, this.canvasRef.current.width, this.canvasRef.current.height);
  }

  getPositionCommon = (e) => {
    const { left, top } = this.canvasRef.current.getBoundingClientRect();
    const { clientX, clientY } = (e.changedTouches && e.changedTouches.length) ? e.changedTouches[0] : e;
    const x = clientX -left;
    const y = clientY - top; 

    return { x, y };
  }

  drawStart = (e) => {
    console.log('start');
    e.preventDefault();
    this.isDrawing = true;
    const { x, y } = this.getPositionCommon(e);

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
  }

  drawMove = (e) =>  {
    console.log('move');
    e.preventDefault();
    const { x, y } = this.getPositionCommon(e);
    const { isClearing } = this.state;

    if (this.isDrawing) {
      if (isClearing) {
        this.ctx.clearRect(x - this.clearWidth, y - this.clearWidth, this.clearWidth, this.clearWidth);
      } else {
        this.ctx.strokeStyle = '#333';
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
      }
    }
  }

  drawEnd = (e) => {
    console.log('end');
    e.preventDefault();

    if (this.isDrawing) {

      // this.ctx.closePath();

      // 每次操作画布都要保存快照，后面撤销使用
      this.canvasHistory.push(this.saveCanvasToImage());
      console.log(this.canvasHistory.length);
    }
    this.isDrawing = false;
  }

  clearCanvas = () => {
    this.ctx.clearRect(0, 0, this.canvasRef.current.width, this.canvasRef.current.height);
  }

  resetToPreStep = () => {
    const { canvasHistory } = this;

    if (canvasHistory.length) {
      canvasHistory.pop(); // 先将当前的快照丢弃，准备获取前一步的快照

      if (canvasHistory.length) {
        const currentCanvasIMage = canvasHistory[canvasHistory.length - 1];
        let canvasPic = new Image();

        canvasPic.src = currentCanvasIMage;
        canvasPic.addEventListener('load', () => {
          this.ctx.clearRect(0, 0, this.canvasRef.current.width, this.canvasRef.current.height);
          this.ctx.drawImage(canvasPic, 0, 0);
        });
      } else {
        this.clearCanvas();
      }
    }
  }

  saveCanvasToImage = () => {
    return this.canvasRef.current.toDataURL();
  }

  // 切换橡皮擦的状态
  toggleClearStatus = () => {
    this.setState((preState) => {
      return { isClearing: !preState.isClearing };
    });
  }

  render() {
    const { isClearing } = this.state;

    return (
      <div className="content">
        <div style={{ height: '300px', width: '100%', background: '#999' }} />
        <div style={{ position: 'relative', overflow: 'hidden', touchAction: 'none'}}>
          <canvas
            ref={this.canvasRef}
            onClick={(e) => { e.preventDefault(); }}
            onTouchStart={this.drawStart}
            onTouchMove={this.drawMove}
            onTouchEnd={this.drawEnd}
            onMouseDown={this.drawStart}
            onMouseMove={this.drawMove}
            onMouseUp={this.drawEnd}
            onMouseOut={this.drawEnd}
            width="375px"
            height="200px"
            style={{ userSelect: 'none' }}
          />
          <div onClick={this.clearCanvas}>清空</div>
          <div onClick={this.resetToPreStep}>撤销</div>
          <div onClick={this.toggleClearStatus}  style={{ color: isClearing ? '#3692f5': '#000' }}>橡皮擦</div>
          <div onClick={this.saveCanvasToImage}>保存图片</div>
        </div>
        <div style={{ height: '1300px', width: '100%', background: '#999' }}></div>
      </div>
    )
  }
}

export default DrawSignature;
