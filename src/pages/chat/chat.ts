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
  public watson_payload = null;
  public user_data;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public loginService: LoginServiceProvider) {
    this.user_data = navParams.get("data");

    this.loginService.chat({}).subscribe(
      data => {
        var res = data.json();
        this.watson_payload = res.context;
        this.chats.push({
          type: "bot",
          message: res.output.text.join("\n"),
          context: res.output.context
        })
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  sendChat() {
    if(this.chat_content){
      this.chats.push({"type":"user", "message":this.chat_content});
      this.watson_payload.card.no = this.user_data.account_no;
      this.watson_payload.mobile = true;
      var chat_data = {
        input : {
          text: this.chat_content
        },
        context: this.watson_payload
      };
      console.log(this.watson_payload);
      console.log(chat_data);
      this.loginService.chat(chat_data).subscribe(
        data => {
          var res = data.json();
          this.watson_payload = res.context;
          for(var i=0;i<res.output.text.length;i++){
            setTimeout(
              this.chats.push({
                type: "bot",
                message: res.output.text[i]
              })
            , 300);
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
    }else{
      let alert = this.alertCtrl.create({
        title: 'Invalid Input',
        subTitle: 'Please input something to say to the bot.',
        buttons: ['OK']
      });
      alert.present();
    }

    this.chat_content = "";
  }

}
