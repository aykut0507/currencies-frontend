import { ChangeDetectorRef, Component } from '@angular/core';
import { SocketService } from './socket/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WebSocketClient';
    stock: any = {};

    //private webSocket: WebSocket;

    //constructor(private webSocketService: SocketService) {
      
      /*debugger
      this.webSocket = new WebSocket('http://localhost:8080/sba-websocket');
      debugger
      this.webSocket.onmessage = (event) => {
        this.stock = JSON.parse(event.data)
      };*/
      //this.socketService.onFetchMovies(); 
    //}

    //ngOnInit() : void {
    //  debugger
      /*this.webSocketService.listen('test event').subscribe((data: any) => {
        console.log(data);
      })*/
      /*this.stompService.subscribe('/topic/dolar', (): void => {
        debugger
      })*/
    //}

  greeting: any;
  name: any;
  constructor(private socketService: SocketService) {
  }

  ngOnInit() {
    this.connect();
    this.socketService.currentMessage.subscribe(message => {
      debugger
      if (message) {
        this.name = JSON.parse(message);
      }
    })
    debugger
  }

  connect(){
    if (this.socketService) {
      debugger
      this.socketService._connect()
      debugger
    }
  }

  disconnect(){
    if (this.socketService) {
      this.socketService._disconnect();
    }
  }
}
