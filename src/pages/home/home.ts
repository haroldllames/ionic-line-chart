import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import * as io from "socket.io-client";


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {

  January: number;  
  February: number;
  March: number;
  April: number;
  May: number;
  June: number;
  socket = io('https://socket-io-use.herokuapp.com/',
  {reconnect: true, transports : ['websocket']});
  months = ['January', 'February', 'March', 'April', 'May', 'June'];
  // color: string = "#127bdc";
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController) {
  }

  ngOnInit(): void {
    this.socket.on('initRate', (data) => {
      this.January = data.jan;
      this.February = data.feb;
      this.March = data.mar;
      this.April = data.apr;  
      this.May = data.may;
      this.June = data.jun;
    });
  }

  sendRate(val, month) {
    let rates = [this.January, this.February, this.March, this.April, this.May, this.June];
    this.socket.emit('send-rate', {
      rate: rates,
      value: val,
      monthChanged: month
    });
  }


  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Chart Background Color',
      buttons: [
        {
          text: 'Turquoise ',
          handler: () => {
            this.socket.emit('changeColor' , 'rgba(64, 224, 208, 0.2)');
          }
        },
        {
          text: 'Silver',
          handler: () => {
            this.socket.emit('changeColor' , 'rgba(192, 192, 192, 0.2)');
          }
        },
        {
          text: 'Green',
          handler: () => {
            this.socket.emit('changeColor' , 'rgba(0, 100, 0, 0.3)');
          }
        },
        {
          text: 'Deep Pink  ',
          handler: () => {
            this.socket.emit('changeColor' , 'rgba(255, 20, 147, 0.3)');
          }
        }
      ]
    });
 
    actionSheet.present();
  }


}
