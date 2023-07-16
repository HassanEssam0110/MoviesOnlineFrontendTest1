import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class SearchMediaByIdService {
  _url = "http://127.0.0.1:8088";

  constructor(private http: HttpClient, private authService: AuthServiceService) { }

  authToken = this.authService.getToken();
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.authToken}`
  });

  SearchMediaById(id: any) {
    // Make the HTTP GET request with the headers
    return this.http.get(this._url + "/movie/" + id, { headers: this.headers });
  }
}
