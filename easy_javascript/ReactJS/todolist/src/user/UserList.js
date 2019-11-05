import React from 'react';
import { connect } from 'react-redux';  // 作用連結
import actionCreators from './userActions';  // 載入我們的 action
import {bindActionCreators} from 'redux';   // 綁定 ActionCreators

class UserList extends React.Component{

      constructor(props) {
            super(props)
      }

      // 其實也可以把抓資料寫在 生命週期那一開始觸發的時候
      getData = () => {
            // 不用特別寫 this.props.dispatch => 因為已經繫結了
            this.props.fetchUserList();
      }

      render(){

            const {isLoading, userList, errorMessage} = this.props.user;

            return (
                  <div>
                        <center>
                              <h1>User List</h1>
                              <button type="button" onClick={this.getData}>開始抓資料</button>
                        </center>

                        {
                              // 如果前面的true 後面才會出現；反之 就不出現
                        }
                        { isLoading && <center><div>Loading...</div></center>}
                        { errorMessage.length > 0 && <center><span style={{color : 'red'}}>錯誤訊息： {errorMessage} </span></center>}

                        {
                              userList.map((p, index) => (
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
            )
      }
}

  // 定義 Store 和 Component 做連結要 函式參數
  // 所以這隻 Component 才可以取到 this.props.todo (因為在這邊繫結了)
const mapStateToProps = (state) => ({
      user : state.user    // 這裡的 state 是 index.js 的 reducers 物件
})

const mapDispatchToProps = (dispatch) => ({
      // 進行綁定
      ...bindActionCreators(actionCreators, dispatch),
      dispatch
})

export default  connect(mapStateToProps, mapDispatchToProps)(UserList)