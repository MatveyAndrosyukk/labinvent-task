import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
import {ErrorService} from "./error.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false)
  isLoggedIn$ = this._isLoggedIn$.asObservable()

  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {
    const token = localStorage.getItem('token')
    this._isLoggedIn$.next(!!token)
  }

  logIn(login: string, password: string) {
    var formData = {"username": login, "password": password};
    return this.http.post("/api/auth", formData)
      .pipe(
        catchError(this.errorHandler.bind(this))
      ).pipe(
        tap((response: any) => {
          this._isLoggedIn$.next(true)
          localStorage.setItem('token', response.token)
          localStorage.setItem('username', response.username)
          localStorage.setItem('roles', response.roles.join(' '))
        }))
  }

  errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }

}
