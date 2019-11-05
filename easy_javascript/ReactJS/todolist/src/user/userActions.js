
// 一、宣告 Action 
// 可以用 export 來讓他們各別 export 出去 (和 todoActions.js中的不用用法，所以在Reducer中也是不同的取法喔)
export const FETCH_USER_LIST = 'FETCH_USER_LIST';
export const FETCH_USER_LIST_SUCCESS = 'FETCH_USER_LIST_SUCCESS';
export const FETCH_USER_LIST_FAILURE = 'FETCH_USER_LIST_FAILURE';

// 二、寫 Action creater
// 這邊寫成 回傳一個 function
const fetchUserList = () => {
      return (dispatch, getState) => {
            console.log(getState());   // getState 是取到 現在的 State
            dispatch({type : FETCH_USER_LIST});  // 回傳 type (到 Reducer 去執行)

            // 開始取資料 (非同步的 ，所以上面的先去 Reducer 把 isLoading改成 true ，然後這邊也在繼續執行)
            fetch("https://5db91ed6177b350014ac8050.mockapi.io/api/users")
                  .then(res => res.json())
                  .then(data => {
                        if (data.length === 0){
                              dispatch(fetchUserListFailure('No user data'));  // 取失敗
                        }else{
                              dispatch(fetchUserListSuccess(data));   // 反之 成功
                        }
                  });
      }
}

const fetchUserListSuccess = (data) => ({
      type : FETCH_USER_LIST_SUCCESS,
      data
})

const fetchUserListFailure = (error) => ({
      type : FETCH_USER_LIST_FAILURE,
      error
})

// 三、包裝起來
const actionCreators = {
      fetchUserList,
      fetchUserListSuccess,
      fetchUserListFailure
}

// 四、匯出 (default 的只能一個，但是 const 的就可以很多了)
export default actionCreators