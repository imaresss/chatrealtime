import { Component } from '@angular/core';

import { MasterService } from './master.service';
import {receive} from './receive';
import { GetContentRequest } from './GetContentRequest';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular8-springboot-websocket';
//   msg = Array<receive>();
//   id : number;
//  //webSocketAPI: WebSocketAPI;
//   greeting: string;
//   name: string;
//   r : receive;
//   message : string;
//   request : GetContentRequest;
//   constructor(private m : MasterService ,private route: ActivatedRoute)
//   {
//     console.log('Called Constructor');
//     this.route.queryParams.subscribe(params => {
//         this.id = params['id'];
      
//     });
//   }

//   ngOnInit() {
// //    this.webSocketAPI = new WebSocketAPI(new AppComponent());
//   //  this.webSocketAPI._connect();

//   this.m._connect(this.msg)
//   this.request = new GetContentRequest;
//   this.request.id = this.id


//   this.m.getAllChat(this.request ).subscribe(contentResponse => {
//     if(contentResponse==null){

//       //console.log("data not null")
  
//   //    alert(contentResponse.error.errorMsg);
    
//       return;
//     }
//     console.log("the size is "+ contentResponse.allchat.length)
//     for(var i=0; i < contentResponse.allchat.length;i++)
//     {
//       console.log("in loop here  "+ contentResponse.allchat.length)
//       this.r = new receive();
//       this.r.content = contentResponse.allchat[i].chat
//       this.r.name = contentResponse.allchat[i].name
//         this.msg.push(this.r);
//     }
//   });



//   }

//   connect(){
//     //this.m._connect();
//   }

//   disconnect(){
//     this.m._disconnect();
//   }

//   sendMessage(){
//     this.m._send(this.name , this.message , 1);
//   }

//   handleMessage(message){
//     console.log("JUST BEFORE "+message);
//     this.greeting = "PIK";
//   }
}
