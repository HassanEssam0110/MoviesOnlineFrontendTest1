import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { IMovie } from 'src/app/Shared_Classes_and_types/IMovie';

@Injectable({
  providedIn: 'root'
})
export class AllMediaService {
  _url = "http://127.0.0.1:8088";
  allMediaListFromService: any;
  searchMovieListFromService: IMovie[];

  private searchMovieListSubject = new Subject<IMovie[]>();

  constructor(private http: HttpClient, private authService: AuthServiceService) { }

  setSearchMovieList(searchMovieList: IMovie[]) {
    this.searchMovieListFromService = searchMovieList;
    this.searchMovieListSubject.next(searchMovieList); // emit event
  }

  getSearchMovieListSubject() {
    return this.searchMovieListSubject.asObservable();
  }


  authToken = this.authService.getToken();
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.authToken}`
  });

  allMedia() {
    // Make the HTTP GET request with the headers
    return this.http.get(this._url + "/movie", { headers: this.headers });
  }

  searchByLanguage(language: String) {
    return this.http.get(this._url + "/movie/language/" + language, { headers: this.headers }).pipe(catchError((err) => {
      return throwError(() => err.message || "server error")
    }));
  }

  searchByName(Name: String): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(this._url + "/movie/title/" + Name, { headers: this.headers }).pipe(catchError((err) => {
      return throwError(() => err.message || "server error")
    }));
  }

}
