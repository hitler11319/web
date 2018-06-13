import tornado.ioloop
import tornado.web
from tornado import websocket
 
clients = []
 
class ChatRoom(websocket.WebSocketHandler):
    def check_origin(self, origin):  
        return True
        
    def open(self):
        clients.append(self)
    
    def on_close(self):
        clients.remove(self)
    
    def on_message(self, message):
        for client in clients:
            client.write_message(message)
 
application = tornado.web.Application([(r"/", ChatRoom),])
 
if __name__ == "__main__":
    application.listen(8000)
    tornado.ioloop.IOLoop.instance().start()