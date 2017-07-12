import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { DashboardPage } from '../../pages/dashboard/dashboard';

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
        if(data["_body"]){
          var res = data.json();
          if(res instanceof Object) {
            this.navCtrl.push(DashboardPage, {
              data: res
            });
          } else {
            let alert = this.alertCtrl.create({
              title: "Login Failed",
              subTitle: "Invalid username/password",
              buttons: ['OK']
            });
            alert.present();          
          } 
        }else{
          let alert = this.alertCtrl.create({
            title: "Login Failed",
            subTitle: "Invalid username/password",
            buttons: ['OK']
          });
          alert.present();    
        }
      },
      err => {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: "There is an error in your request. Please try again.",
          buttons: ['OK']
        });
        alert.present();
      }
    );
  }
}
