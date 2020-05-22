import React from 'react';
import './App.css';

class App extends React.Component {
  preScrollTop;

  constructor() {
    super();
    this.state = {
      fixedBotttom: 0,
      windowInnerHeightList: [],
    }
  }

  componentDidMount() {
    this.preScrollTop = document.documentElement.scrollTop;
    console.log(this.preScrollTop);

    window.addEventListener('scroll', () => {
      this.setState((preState) => {
        return {
          windowInnerHeightList: [...preState.windowInnerHeightList, window.innerHeight]
        }
      });
      const currentScrollTop = document.documentElement.scrollTop;
      let calculateBottom = this.state.fixedBotttom + currentScrollTop - this.preScrollTop;
      console.log(this.preScrollTop, currentScrollTop, calculateBottom);

      calculateBottom = calculateBottom > 30 ? 30 : (calculateBottom <= 0 ? 0 : calculateBottom);
      this.setState({
        fixedBotttom: calculateBottom
      }, () => {
        this.preScrollTop = currentScrollTop;
      });
    });
  }

  render() {
    return (
      <div className="App">
        <div id="main">
          尽可能少用。Modal 会打断用户操作，只用在重要的时候。
          标题应该简明，不能超过 1 行；描述内容应该简明、完整，一般不多于 2 行。
          操作按钮最多到 3 个（竖排），一般为 1-2 个（横排）；3 个以上建议使用组件 ActionSheet 来完成。
          一般将用户最可能点击的按钮，放在右侧。另外，取消按钮应当始终放在左侧。尽可能少用。Modal 会打断用户操作，只用在重要的时候。
          标题应该简明，不能超过 1 行；描述内容应该简明、完整，一般不多于 2 行。
          操作按钮最多到 3 个（竖排），一般为 1-2 个（横排）；3 个以上建议使用组件 ActionSheet 来完成。
          一般将用户最可能点击的按钮，放在右侧。另外，取消按钮应当始终放在左侧。尽可能少用。Modal 会打断用户操作，只用在重要的时候。
          标题应该简明，不能超过 1 行；描述内容应该简明、完整，一般不多于 2 行。
          操作按钮最多到 3 个（竖排），一般为 1-2 个（横排）；3 个以上建议使用组件 ActionSheet 来完成。
        一般将用户最可能点击的按钮，放在右侧。另外，取消按钮应当始终放在左侧。 
          尽可能少用。Modal 会打断用户操作，只用在重要的时候。
          标题应该简明，不能超过 1 行；描述内容应该简明、完整，一般不多于 2 行。
          操作按钮最多到 3 个（竖排），一般为 1-2 个（横排）；3 个以上建议使用组件 ActionSheet 来完成。
          一般将用户最可能点击的按钮，放在右侧。另外，取消按钮应当始终放在左侧。尽可能少用。Modal 会打断用户操作，只用在重要的时候。
          标题应该简明，不能超过 1 行；描述内容应该简明、完整，一般不多于 2 行。
          操作按钮最多到 3 个（竖排），一般为 1-2 个（横排）；3 个以上建议使用组件 ActionSheet 来完成。
          一般将用户最可能点击的按钮，放在右侧。另外，取消按钮应当始终放在左侧。尽可能少用。Modal 会打断用户操作，只用在重要的时候。
          标题应该简明，不能超过 1 行；描述内容应该简明、完整，一般不多于 2 行。
          操作按钮最多到 3 个（竖排），一般为 1-2 个（横排）；3 个以上建议使用组件 ActionSheet 来完成。
        一般将用户最可能点击的按钮，放在右侧。另外，取消按钮应当始终放在左侧。 
          尽可能少用。Modal 会打断用户操作，只用在重要的时候。
          标题应该简明，不能超过 1 行；描述内容应该简明、完整，一般不多于 2 行。
          操作按钮最多到 3 个（竖排），一般为 1-2 个（横排）；3 个以上建议使用组件 ActionSheet 来完成。
          一般将用户最可能点击的按钮，放在右侧。另外，取消按钮应当始终放在左侧。尽可能少用。Modal 会打断用户操作，只用在重要的时候。
          标题应该简明，不能超过 1 行；描述内容应该简明、完整，一般不多于 2 行。
          操作按钮最多到 3 个（竖排），一般为 1-2 个（横排）；3 个以上建议使用组件 ActionSheet 来完成。
          一般将用户最可能点击的按钮，放在右侧。另外，取消按钮应当始终放在左侧。尽可能少用。Modal 会打断用户操作，只用在重要的时候。
          标题应该简明，不能超过 1 行；描述内容应该简明、完整，一般不多于 2 行。
          操作按钮最多到 3 个（竖排），一般为 1-2 个（横排）；3 个以上建议使用组件 ActionSheet 来完成。
        一般将用户最可能点击的按钮，放在右侧。另外，取消按钮应当始终放在左侧。 
          尽可能少用。Modal 会打断用户操作，只用在重要的时候。
          标题应该简明，不能超过 1 行；描述内容应该简明、完整，一般不多于 2 行。
          操作按钮最多到 3 个（竖排），一般为 1-2 个（横排）；3 个以上建议使用组件 ActionSheet 来完成。
          一般将用户最可能点击的按钮，放在右侧。另外，取消按钮应当始终放在左侧。尽可能少用。Modal 会打断用户操作，只用在重要的时候。
          标题应该简明，不能超过 1 行；描述内容应该简明、完整，一般不多于 2 行。
          操作按钮最多到 3 个（竖排），一般为 1-2 个（横排）；3 个以上建议使用组件 ActionSheet 来完成。
          一般将用户最可能点击的按钮，放在右侧。另外，取消按钮应当始终放在左侧。尽可能少用。Modal 会打断用户操作，只用在重要的时候。
          标题应该简明，不能超过 1 行；描述内容应该简明、完整，一般不多于 2 行。
          操作按钮最多到 3 个（竖排），一般为 1-2 个（横排）；3 个以上建议使用组件 ActionSheet 来完成。
        一般将用户最可能点击的按钮，放在右侧。另外，取消按钮应当始终放在左侧。 
        </div>
        <div className='content' style={{ bottom: this.state.fixedBotttom }}>
          {this.state.windowInnerHeightList.map((val) => {
            return <span>---{val}----;</span>
          })}
        </div>
      </div>
    );
  }
}

export default App;
