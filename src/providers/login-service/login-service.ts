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
  public server_url = "https://chinabank.mybluemix.net/";
  constructor(public http: Http) {
    console.log('Hello LoginServiceProvider Provider');
  }

  login(username, password) {
    var data = {
      username: username,
      password: password
    };

    let json = this.http.post(this.server_url + "account/login", JSON.stringify(data));
    return json;
  }

  chat(content) {

    let json = this.http.post(this.server_url + "api/message", content);
    return json;
  }
}
