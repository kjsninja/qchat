import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ChatPage } from '../../pages/chat/chat';

/**
 * Generated class for the DashboardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  public types = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.types.push({"code":"FINANCE", "image":"financial.png", "content":"Financial Talk"});
    this.types.push({"code":"MEDICAL", "image":"Medical.png", "content":"Medical Consulation"});
    this.types.push({"code":"HR", "image":"HR.png", "content":"Human Resources Management"});
  }

  openChat(code) {
    this.navCtrl.push(ChatPage, {
      type: code,
      data: this.navParams.get("data")
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

}
