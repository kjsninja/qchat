import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the LoginServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LoginServiceProvider {

  constructor(public http: Http) {
    console.log('Hello LoginServiceProvider Provider');
  }

  login(username, password) {
    var data = {
      username: username,
      password: password
    };

    let json = this.http.post("http://192.168.56.1:6008/login/dummy", JSON.stringify(data));
    return json;
  }

  chat(content) {
    var data = {
      content: content
    };

    let json = this.http.post("http://192.168.56.1:6008/chat/dummy", JSON.stringify(data));
    return json;
  }
}
