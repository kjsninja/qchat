import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { LoginServiceProvider } from '../../providers/login-service/login-service';

/**
 * Generated class for the ChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
  providers: [LoginServiceProvider]
})
export class ChatPage {
  public chats = [];
  public chat_content;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public loginService: LoginServiceProvider) {
    var data = navParams.get("data").data;
    var type = navParams.get("type");

    var name = data.name;

    this.chats.push({"type":"bot", "message":"Hi there, " + name + ". Ask me anything about " + type + "."});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  sendChat() {
    this.chats.push({"type":"user", "message":this.chat_content});

    this.loginService.chat(this.chat_content).subscribe(
      data => {
        var res = data.json();
        if(res.status == 0) {
          this.chats.push({"type":"bot", "message":res.message});
        } else {
          this.chats.push({"type":"bot", "message":"I'm sorry, can you try again?"});          
        }
      },
      err => {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: err,
          buttons: ['OK']
        });
        alert.present();
      }
    );

    this.chat_content = "";
  }

}
