import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

import { UserLogin } from '../Shared_Classes_and_types/user/UserLogin'
import { UserRegister } from '../Shared_Classes_and_types/user/UserRegister';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  // public authStatusChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  isLoggedIn: boolean = false;
  _url = "http://127.0.0.1:8088";

  constructor(private http: HttpClient) { }

  enroll(UserRegister: UserRegister) {
    return this.http.post<any>(this._url + "/signup", UserRegister)
  }

  login(UserLogin: UserLogin) {
    return this.http.post<any>(this._url + "/login", UserLogin)
  }

  setIsLoggedIn(logValue: boolean) {
    this.isLoggedIn = logValue;
  }

  getIsLoggedIn() {
    return this.isLoggedIn;
  }


  getToken() {
    let token = localStorage.getItem('token');
    return token
  }

}
