// import { Injectable } from "@angular/core";
// import { Observable, of } from "rxjs";
// import * as SockJS from "sockjs-client";
// import * as Stomp from "stompjs"

// @Injectable()
// export class StompService {
//     socket = new SockJS('http://localhost:8080/sba-websocket');
//     stompClient = Stomp.over(this.socket);

//     subscribe(topic: string, callback?: any): void {
//         debugger
//         const connected: boolean = this.stompClient.connected;
//         if (connected) {
//             this.subscribeToTopic(topic, callback);
//             return;
//         }      
//         this.stompClient.connect({}, (): any => {
//             this.subscribeToTopic(topic, callback);
//         })
//     }

//     private subscribeToTopic(topic: string, callback?: any): void {
//         debugger
//         this.stompClient.subscribe(topic, (): any => {
//             callback();
//         })
//     }
// }