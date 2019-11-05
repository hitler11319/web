// Hooks => 讓 function Component 有自己的 State

import React, {useState, useEffect} from 'react';

function HooksExample(){
      // = useState(接收的那2個預設的值，這邊是 number = 0)
      const [number, setNumber] = useState(0);
      const [data, setData] = useState(1);

      useEffect(() => {
            fetch("https://5db91ed6177b350014ac8050.mockapi.io/api/users")
                  .then(res => res.json())
                  .then(data => setData(data));
      })

      return (
            <div>
                  {number}
                  {
                        // setNumber 就是上面的 setNumber 
                        // 而傳入 number + 1 => 因為 是 [number, setNumber] ， 所以繫結了 number ，所以傳入的就會去變動他
                  }
                  <button onClick={() => setNumber(number + 1)}>值加1</button>
            </div>
      )
}

export default HooksExample;