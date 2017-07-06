import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ChatPage } from '../../pages/chat/chat';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  //V says: delete this, this is just for navigation to chat page
  goToChatPage() {
    this.navCtrl.push(ChatPage, {
      test: 'test'
    });
  }
}
