using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebSocketSharp;

/*
    參考網圵： https://dotblogs.com.tw/EganBlog/2019/05/25/WebSocket_Vue_WebSocketSharp
    請先去 NUGET 裝上 WebSocketSharp-netstandard
 */
using WebSocketSharp.Server;

namespace FirstWebSocket
{
    public class MyWebSocket : WebSocketBehavior
    {
        public MyWebSocket()
        {
        }

        /// <summary>
        ///  開啟
        /// </summary>
        protected override void OnOpen()
        {
            Console.WriteLine("WebSocket 開啟\n");

            // 自已這隻 本身的 ID
            Console.WriteLine($"觀迎新加入的人， id = {this.ID}\n");

            // 全部的 id (這方法能用，但不好)
            // 以後 登入進來後，傳 id 給前端 讓 前端記住 他是哪個 id
            List<string> currentIDs = Sessions.ActiveIDs.ToList();
            var openSuccessMessage = $" 你是 第 {currentIDs.IndexOf(this.ID) + 1} 位 連上的使用者， 你的 id 是 {this.ID}";
            Sessions.SendTo(Encoding.UTF8.GetBytes(openSuccessMessage), this.ID);

            // 廣播
            string addMessage = $" id = {this.ID} 已經加入了房間";
            Sessions.BroadcastAsync(Encoding.UTF8.GetBytes(addMessage), null);

            /*
             如果要做 進來後有各自的名字的話 (前端儲存紀錄檔)
             而在一開始 Open 的時候 傳給使用者 其 id (要自己記得)， 然後再傳給全部人 (告訴全部人現在所有的 id)
             而名字的部份，就讓 使用者 傳上來後， 用 id 去判別是誰傳的 。 再告訴全部人， 這個 id 叫什麼名字 即可
             */
        }

        /// <summary>
        /// 關閉
        /// </summary>
        /// <param name="e"></param>
        protected override void OnClose(CloseEventArgs e)
        {
            string errorReason = e.Reason;
            Console.WriteLine($"WebSocket 關關中， 原因 = {errorReason}");
            Console.WriteLine($"id = {this.ID}  已離開");

            // 廣播
            string leaveMessage = $" id = {this.ID} 已經離開了房間";
            Sessions.BroadcastAsync(Encoding.UTF8.GetBytes(leaveMessage), null);
        }

        /// <summary>
        /// 發生錯誤
        /// </summary>
        /// <param name="e"></param>
        protected override void OnError(ErrorEventArgs e)
        {
            Console.WriteLine($"WebSocket 發生錯誤 ， 錯誤為： {e.Message}， 錯誤使用者id = {this.ID}");
        }

        /// <summary>
        /// 得到訊息
        /// </summary>
        /// <param name="e"></param>
        protected override void OnMessage(MessageEventArgs e)
        {
            /*
                PS：目前沒看到可以像 python 一樣，有個共用的變數(每個都是各自的 MyWebSocket 物件)
                    => 只只能放在 DB中， 或者前端自己存
                    => 或者用 Static 變數(如下)
             */

            // 儲存共用的資料
            CommonVar.messageList.Add($"{this.ID}：{e.Data}");
            var a = CommonVar.messageList;

            string message = e.Data;
            Console.WriteLine($"id = {this.ID} 送出訊息： {message}");

            string response = $"id = {this.ID} 送出訊息：{message}";

            // 廣播資料
            Sessions.BroadcastAsync(Encoding.UTF8.GetBytes(response), null);

            // 得到目前活躍所有的人
            List<string> currentIds = Sessions.ActiveIDs.ToList();
            // 所有的 id
            //List<string> allIds = Sessions.IDs.ToList();

            // 送給單一個人 (用上面的 id 來決定給誰)
            // 自已這隻本身的id 就是 this.ID
            //Sessions.SendTo(Encoding.UTF8.GetBytes(response), "上面的currentIds選一個");
            //Sessions.SendToAsync(Encoding.UTF8.GetBytes(response), "上面的currentIds選一個", null);

            // 關閉某個人
            //Sessions.CloseSession("上面的currentIds選一個");
        }

        /// <summary>
        /// 自己擴充的 (對去掉自己以外的人送出訊息)
        /// </summary>
        protected void NoSelfToBroadcast(string message)
        {
            List<string> currentIds = Sessions.ActiveIDs.ToList();
            foreach (var id in currentIds)
            {
                if (id != this.ID)
                {
                    Sessions.SendTo(Encoding.UTF8.GetBytes(message), id);
                }
            }
        }
    }
}
