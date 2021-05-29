import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { GLOBAL } from './global';
import { User } from '../core/models/user';
import { variable } from '@angular/compiler/src/output/output_ast';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  public identity
  public url: string;


  private variable2 = new Subject<any>();
  private subject = new BehaviorSubject<any>(null);
  islogin: Observable<any> = this.subject.asObservable();
  constructor(
    private http: HttpClient,
  ) {
    this.url = GLOBAL.url;

    this.subject.next(JSON.parse(localStorage.getItem('identity'))?? null); //verifico que exista en el local

  }


  registerUser(user: User): Observable<any> {
    return this.http.post(this.url + 'register-user', user);
  }

  loginUser(user): Observable<any> {
    return this.http.post<any>(this.url + 'login', user).pipe(tap(obj => {
      this.subject.next(obj.user);
      if (obj.status != 'error') {
        localStorage.setItem('token', obj.token);
        localStorage.setItem('identity', JSON.stringify(obj.user));

      }
    }));
  }

  loggout(){
    localStorage.clear();
    this.subject.next(null);
  }
}
