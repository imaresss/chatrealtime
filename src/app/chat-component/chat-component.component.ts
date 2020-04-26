import { Component, OnInit } from '@angular/core';
import { receive } from '../receive';
import { GetContentRequest } from '../GetContentRequest';
import { MasterService } from '../master.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chat-component',
  templateUrl: './chat-component.component.html',
  styleUrls: ['./chat-component.component.css']
})
export class ChatComponentComponent implements OnInit {

  title = 'angular8-springboot-websocket';
  msg = Array<receive>();
  id : number;
 //webSocketAPI: WebSocketAPI;
  greeting: string;
  private sub: any;
  name: string;
  r : receive;
  message : string;
  request : GetContentRequest;
  constructor(private m : MasterService ,private route: ActivatedRoute)
  {
    console.log('Called Constructor');
   
  }

  ngOnInit() {
//    this.webSocketAPI = new WebSocketAPI(new AppComponent());
  //  this.webSocketAPI._connect();
   
  this.sub = this.route.params.subscribe(params => {
    this.id = params['id']; // (+) converts string 'id' to a number

 });
 
    console.log("called first "+ this.id)
  this.m._connect(this.msg)
  this.request = new GetContentRequest;
  this.request.id = this.id


  this.m.getAllChat(this.request ).subscribe(contentResponse => {
    if(contentResponse==null){

      //console.log("data not null")
  
  //    alert(contentResponse.error.errorMsg);
    
      return;
    }
    console.log("the size is "+ contentResponse.allchat.length)
    for(var i=0; i < contentResponse.allchat.length;i++)
    {
      console.log("in loop here  "+ contentResponse.allchat.length)
      this.r = new receive();
      this.r.content = contentResponse.allchat[i].chat
      this.r.name = contentResponse.allchat[i].name
        this.msg.push(this.r);
    }
  });



  }

  connect(){
    //this.m._connect();
  }

  disconnect(){
    this.m._disconnect();
  }

  sendMessage(){
    this.m._send(this.name , this.message , this.id);
  }

  handleMessage(message){
    console.log("JUST BEFORE "+message);
    this.greeting = "PIK";
  }

}
