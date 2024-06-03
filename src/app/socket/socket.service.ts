import { EventEmitter, Injectable, Output } from '@angular/core';
import * as io from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Injectable({
	providedIn: 'root'
})
export class SocketService {
	webSocketEndPoint: string = 'http://localhost:8080/ws';
    topic: string = "/topic/greetings";
    stompClient: any;
	@Output() response = new EventEmitter<any>();
	private messageSource = new BehaviorSubject('');
  	currentMessage = this.messageSource.asObservable();
	//appComponent: AppComponent;

	_connect(): void {
        console.log("Initialize WebSocket Connection");
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
		let result;
	
        _this.stompClient.connect({}, function (frame: any) {
			_this.sendMessage();
            _this.stompClient.subscribe(_this.topic, function (sdkEvent: any) {
                let result = _this.onMessageReceived(sdkEvent);
				return sdkEvent;
            });
            //_this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBack);
		debugger
		console.log(result);
    };

	_disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error: any) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this._connect();
        }, 5000);
    }

 /**
  * Send message to sever via web socket
  * @param {*} message 
  */
    _send(message: any) {
        console.log("calling logout api via web socket");
        this.stompClient.send("/app/hello", {}, JSON.stringify(message));
    }

    onMessageReceived(message: any) {
        console.log("Message Recieved from Server :: " + message);
    	let result = this.handleMessage(message.body);
		this.response.emit(result);
		return result;
    }

	sendMessage(){
		this._send("");
	}
	
	handleMessage(message: any){
		debugger
		this.messageSource.next(message)
		return message;
		//this.response.emit(message);
		//if (this.appComponent) {
		//	this.appComponent.name.push(message);
		//}
		//this.messageSource.next(message)
		//this.greeting = message;
	}
	//constructor() {
		//this.socket = io(this.uri);
	//}

	/*listen(eventName: string) {
		debugger
		return new Observable((subscriber) => {
			this.socket.on(eventName, (data: any) => {
				subscriber.next(data);
			})
		})
	}

	emit(eventName: string, data: any) {
		this.socket.emit(eventName, data)
	}*/

	/*constructor(private socket: Socket) { 
		debugger
		socket.on('gs-guide-websocket', () => {
			debugger
			console.log("adasdasd")
		});
	}
	socketName: string = "gs-guide-websocket";

	// emit event
	fetchMovies() {
		this.socket.emit('currencies-result', 'msg');
	}

	// listen event
	onFetchMovies() {
		debugger
		this.socket.on('gs-guide-websocket', () => {
			debugger
			console.log("adasdasd")
		});
		//return this.socket.fromEvent(this.socketName);
	}*/
}
