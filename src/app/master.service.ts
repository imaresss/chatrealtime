import { Injectable, ErrorHandler } from '@angular/core';
import {Stomp} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {send} from './send';
import {receive} from './receive';
import {AllChat} from './AllChat';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GetContentRequest } from './GetContentRequest';
import { Observable } from 'rxjs';
import { catchError, shareReplay, delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MasterService {

 
    s : send;
  webSocketEndPoint: string = 'http://ec2-35-154-157-255.ap-south-1.compute.amazonaws.com/stomp/ws';
    topic: string = "/topic/greetings/1";
    stompClient: any;
  //  appComponent: AppComponent;
  constructor(private http: HttpClient) { 
    
  }

  public getAllChat(payload: GetContentRequest): Observable<AllChat>{

   
    //   let headers = new HttpHeaders({
    //     'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    // 'Access-Control-Allow-Headers':'Origin, Content-Type, X-Auth-Token' });
    // let options = { headers: headers };
      return this.http.post<AllChat>('http://ec2-35-154-157-255.ap-south-1.compute.amazonaws.com/stomp/s/chat', payload ).pipe(
       
      );
    }


  public _connect(msg : Array<receive>) {
    console.log("Initialize WebSocket Connection");
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function (frame) {
        _this.stompClient.subscribe(_this.topic,(sdkEvent) => {
            console.log("GOT IT HERE "+JSON.parse(sdkEvent.body).name)
            msg.push(JSON.parse(sdkEvent.body));
          //  this.as.push('')
            _this.onMessageReceived(JSON.parse(sdkEvent.body));
        });
        //_this.stompClient.reconnect_delay = 2000;
    }, this.errorCallBack);
};

_disconnect() {
    if (this.stompClient !== null) {
        this.stompClient.disconnect();
    }
    console.log("Disconnected");
}

// on error, schedule a reconnection attempt
errorCallBack(error) {
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
       // this._connect(thi);
    }, 5000);
}

/**
* Send message to sever via web socket
* @param {*} message 
*/
_send(name  , message , id ) {
    this.s =  new send();
    this.s.chat = message;
    this.s.name = name;
    this.s.id = id;
    console.log("calling logout api via web socket "+ JSON.stringify(this.s));
    this.stompClient.send("/app/hello/1", {}, JSON.stringify(this.s));
}

onMessageReceived(message) {
    console.log("Message Recieved from Server :: is  " + message);
    //this.appComponent.handleMessage(message);
}

}
