using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

/*
    參考網圵： https://dotblogs.com.tw/EganBlog/2019/05/25/WebSocket_Vue_WebSocketSharp
    請先去 NUGET 裝上 WebSocketSharp-netstandard
 */
using WebSocketSharp.Server;

namespace FirstWebSocket
{
    class Program
    {
        static void Main(string[] args)
        {
            CommonVar.messageList.Add("已開啟聊天");

            //WebSocketServer 監聽 PORT 55688
            var wssv = new WebSocketServer(55688);

            // 可開多個
            wssv.AddWebSocketService<MyWebSocket>("/FirstWebSocket");
            wssv.AddWebSocketService<MyWebSocket>("/SecondWebSocket");

            // 開啟
            wssv.Start();

            if (wssv.IsListening)
            {
                Console.WriteLine("Listening on port {0}, and providing WebSocket services:", wssv.Port);
                foreach (var path in wssv.WebSocketServices.Paths)
                {
                    Console.WriteLine("- {0}", path);
                }
            }

            Console.WriteLine("\n請輸入 EXIT 來離開 WebSocket");
            string cmd = Console.ReadLine();
            if (cmd.ToUpper() == "EXIT")
            {
                // 結束 socket
                Console.WriteLine("WebSocket 即將結束");    
                wssv.Stop();
            }
        }
    }
}
