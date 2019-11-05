// 這裡是測試 API 的部份
import React from "react";

class API extends React.Component {
  // 在 index.js 中有寫到 如何給他 props
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  // 名稱要一模一樣喔(這是特別的，在component開始時)
  /*
    LifeCircle的部份：

    componentDidMount()  => 初使化
    componentDidUpdate(prevProps, prevState, snapShot) => 被更改
    componentWillUnmount()  => 被移除
  */
  componentDidMount() {
        // call api ， 並把 data 寫進去
    fetch("https://5db91ed6177b350014ac8050.mockapi.io/api/users")
      .then(res => res.json())
      .then(data => this.setState({ data : data }));  // 要改變 this.state 的值 只能用 this.setState({新值})
    console.log("search Finish");
  }

  // 比較常寫的寫法是用 ES6的方式，拿上面來改就是
  /*
    componentDidMount = () => {
          fetch("https://5db91ed6177b350014ac8050.mockapi.io/api/users")
          .then(res => res.json())
          .then(data => this.setState({ data }));  // 要改變 this.state 的值 只能用 this.setState({新值})
          console.log("search Finish");
    }
  */

  render() {
    return (
      <div>
        {
          // 用 this.props 可以取到所有給到的 參數
          // 所以剛才傳入的是 count = 3 -> 所以這邊的 this.props.count 當然就是 3 囉
        }
        <p>this.props.count: {this.props.count}</p>
        <pre>
          <code>{JSON.stringify(this.state.data, null, 2)}</code>
        </pre>

        {
          this.state.data.map((p, index) => (
            <div key = {p.id}>
              {p.createAt}
              <br />
              {p.name}
              <br />
              <img src = {p.avatar} alt = {p.name} />
              </div>
          ))
        }

      </div>
    );
  }
}

// 只能匯出一隻
export default API;