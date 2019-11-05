// 這裡是測試 API 的部份
import React from "react";

class ItemList extends React.Component {
  // 在 index.js 中有寫到 如何給他 props
  constructor(props) {

      // props 是 readonly 的 => 所以不太行這麼用
    super(props);
    // 因為 這個 props是從父親的 this.state 中的資料
    // 所以當這邊對 this.props 改變時， 父親的 this.state.ItemList 也會跟著改變
    console.log(props.list)
  }

  onChangeInput = (e, index) => {
        const old = this.props.list[index];
        old.isFinish = e.target.checked;
        this.props.list[index] = old;
  }

  removeItem = (index) => {
        this.props.list.splice(index, 1);
  }

  render() {
    return (
      <div>
            {
                  this.props.list.map((p, index) => (
                        <div key = {p.id}>
                              <input type="checkbox" checked={p.isFinish} onChange={(e) => this.onChangeInput(e, index)} /> {p.name}                    
                              <button type="button" onClick={this.removeItem(index)}>Remove</button>
                        </div>
                  ))
            }
      </div>
    );
  }
}

// 只能匯出一隻
export default ItemList;