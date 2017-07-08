import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomePage } from '../../pages/home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {

  }

  //V says: delete this, this is just for navigation to chat page
  goToHomePage() {
    this.navCtrl.push(HomePage, {
      test: 'test'
    });
  }
}