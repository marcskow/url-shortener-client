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

  authenticate(credentials, callback) {
      const headers = new HttpHeaders(credentials ? {
        authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
      } : {});

      return this.http.get('api/user', {headers: headers}).pipe(map(username => {
        if (username) {
            this.authenticated = true;
            localStorage.setItem('username', JSON.stringify(username));
        }

        return username;
    }));
  }

  login(credentials) {
    return this.http.post<any>('api/auth/login', credentials).pipe(
      map(user => {
        if(user && user.accessToken) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      })
    )
  }

  isAuthenticated() {
    return localStorage.getItem('currentUser') || this.authenticated
  }

  logout() {
    this.http.post('logout', {}).pipe(finalize(() => {
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