import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {GLOBAL} from './global';
import {User} from '../core/models/user';

@Injectable({
  providedIn: 'root'
})

export class UserService{

  public url: string;

  constructor(
            private http: HttpClient,
            ) {
              this.url = GLOBAL.url;
            }


  registerUser(user:  User): Observable<any>{
    return this.http.post(this.url+'register-user', user);
  }

  loginUser(user){
    return this.http.post<any>(this.url + 'login', user);
  }
}
