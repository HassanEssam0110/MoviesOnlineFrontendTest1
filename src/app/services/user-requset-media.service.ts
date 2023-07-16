import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { Observable, catchError , throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRequsetMediaService {
  _url = "http://127.0.0.1:8088";


  constructor(private http: HttpClient, private authService: AuthServiceService) { }

  authToken = this.authService.getToken();
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.authToken}`
  });

  sendUserRequest(req: any): Observable<any> {
    console.log("token :" + this.authToken)
    console.log("headers :" + this.headers)
    console.log("req :" + req)
    return this.http.post(this._url + "/userRequest", req, { headers: this.headers }).pipe(catchError((err) => {
      return throwError(() => err.message || "server error")
    }));
  }

  getUserRequset(userId: any): Observable<any> {
    return this.http.get<any>(this._url + "/userRequest/" + userId, { headers: this.headers }).pipe(
      catchError((err) => {
        return throwError(() => err.message || "server error")
      }));
  }


}
