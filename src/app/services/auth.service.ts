import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false)
  isLoggedIn$ = this._isLoggedIn$.asObservable()

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token')
    this._isLoggedIn$.next(!!token)
  }

  logIn(login: string, password: string){
    return this.http.post("/api/auth", JSON.stringify({
      username: login,
      password: password
    })).pipe(
      tap((response: any) => {
        this._isLoggedIn$.next(true)
        localStorage.setItem('token', response.token)
        localStorage.setItem('username', response.username)
        localStorage.setItem('roles', response.roles.join(' '))
      })
    )
  }
}
