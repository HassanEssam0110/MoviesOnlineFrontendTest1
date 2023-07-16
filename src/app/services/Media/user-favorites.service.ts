import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserFavoritesService {

  _url = "http://127.0.0.1:8088/user/";

  constructor(private http: HttpClient, private authService: AuthServiceService) { }

  authToken = this.authService.getToken();
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.authToken}`
  });

  public addFavoriteMovie(userId: any, favoriteId: any): Observable<void> {
    return this.http.post<void>(`${this._url}${userId}/favorites`, { favoriteId }, { headers: this.headers });
  }

  public getFavoriteMovies(userId: any): Observable<any> {
    return this.http.get<any>(`${this._url}${userId}/favorites`, { headers: this.headers });
  }


  public removeFavoriteMovie(userId: any, favoriteId: any): Observable<any> {
    return this.http.delete<any>(`${this._url}${userId}/favorites/${favoriteId}`, { headers: this.headers });
  }
}
