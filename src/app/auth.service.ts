import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { finalize, map } from 'rxjs/operators'
import { Credentials } from './home/credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticated = false;

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials) {
    return this.http.post<any>('api/auth/login', credentials).pipe(
      map(user => {
        if(user && user.accessToken) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.authenticated = true
        }
      })
    )
  }

  isAuthenticated() {
    return localStorage.getItem('currentUser') || this.authenticated
  }

  logout() {
    this.http.get('api/auth/logout', {}).pipe(finalize(() => {
      localStorage.removeItem('currentUser')
      this.authenticated = false;
      this.router.navigateByUrl('');
    })).subscribe();
  }
}


/*
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(`${config.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
*/