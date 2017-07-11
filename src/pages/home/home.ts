import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { ChatPage } from '../../pages/chat/chat';

import { LoginServiceProvider } from '../../providers/login-service/login-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [LoginServiceProvider]
})
export class HomePage {
  public username;
  public password;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public loginService: LoginServiceProvider) {
    
  }

  login() {
    this.loginService.login(this.username, this.password).subscribe(
      data => {
        var res = data.json();
        if(res.status == 0) {
          this.navCtrl.push(ChatPage, {
            data: res
          });
        } else {
          let alert = this.alertCtrl.create({
            title: "Login Failed",
            subTitle: res.message,
            buttons: ['OK']
          });
          alert.present();          
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
  }
}
