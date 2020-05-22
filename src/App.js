import React from 'react';

class DrawSignature extends React.Component {
  constructor(props) {
    super(props);
    this.clearWidth = parseInt(props.clearWidth, 10) || 20; // 橡皮擦的擦拭范围，值越大擦的越多
    this.canvasHistory = []; // 每次绘制完都存一份快照，撤销时需要用到
    this.canvasRef = React.createRef();
    this.contentRef = React.createRef();
    this.state = {
      type: '',
      isClearing: false, // 是否为橡皮擦状态, ture：是，false：不是（默认值）
    };
  }

  componentDidMount() {
    this.ctx = this.canvasRef.current.getContext('2d');
  }

  getPositionCommon = (e) => {
    const { left, top } = this.contentRef.current.getBoundingClientRect();
    const x = e.changedTouches[0].clientX -left;
    const y = e.changedTouches[0].clientY - top; 

    return { x, y };
  }

  touchStart = (e) => {
    document.documentElement.style.overflow = 'hidden';
    const { x, y } = this.getPositionCommon(e);

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
  }

  touchMove = (e) =>  {
    document.documentElement.style.overflow = 'hidden';
    const { x, y } = this.getPositionCommon(e);
    const { isClearing } = this.state;

    if (isClearing) {
      this.ctx.clearRect(x - this.clearWidth, y - this.clearWidth, this.clearWidth, this.clearWidth);
    } else {
      this.ctx.strokeStyle = '#333';
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    }
  }

  touchEnd = (e) => { 
    document.documentElement.style.overflow = 'auto';
    this.ctx.closePath();

    // 每次操作画布都要保存快照，后面撤销使用
    this.canvasHistory.push(this.saveCanvasToImage());
  }

  clearCanvas = () => {
    this.ctx.clearRect(0, 0, this.canvasRef.current.width, this.canvasRef.current.height);
  }

  cancelPreStep = () => {
    const { canvasHistory } = this;

    if (canvasHistory.length) {
      const currentCanvasIMage = canvasHistory.pop();
      let canvasPic = new Image();
      canvasPic.src = currentCanvasIMage;
      canvasPic.addEventListener('load', () => {
        this.ctx.clearRect(0, 0, this.canvasRef.current.width, this.canvasRef.current.height);
        this.ctx.drawImage(canvasPic, 0, 0);
      });
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
        <div style={{ position: 'relative'}} ref={this.contentRef}>
          <canvas
            ref={this.canvasRef}
            onTouchStart={this.touchStart}
            onTouchMove={this.touchMove}
            onTouchEnd={this.touchEnd}
            width="375px"
            height="200px"
            style={{ userSelect: 'none' }}
          />
          <div onClick={this.clearCanvas}>清空</div>
          <div onClick={this.cancelPreStep}>撤销</div>
          <div onClick={this.toggleClearStatus}  style={{ color: isClearing ? '#3692f5': '#000' }}>橡皮擦</div>
          <div onClick={this.saveCanvasToImage}>保存图片</div>
        </div>
        <div style={{ height: '1300px', width: '100%', background: '#999' }}>{this.state.type}</div>
      </div>
    )
  }
}

export default DrawSignature;
