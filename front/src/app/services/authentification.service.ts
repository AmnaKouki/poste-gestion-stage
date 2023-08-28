import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

export class User {
  constructor(public status: string) {}
}

export class JwtResponse {
  constructor(public jwttoken: string) {}
}

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  constructor(private httpClient: HttpClient) {}

  authenticate(username: string, password: string) {
    return this.httpClient
      .post<any>(
        'http://localhost:9000/api/auth/login',
        { username, password },
        {
          headers: {
            skip: 'true', // skip this request in the interceptor
          },
        }
      )
      .pipe(
        map((userData) => {
          localStorage.setItem('username', username);
          let tokenStr = 'Bearer ' + userData.accessToken;
          localStorage.setItem('token', tokenStr);
          let userRole = userData.roles[0];
          localStorage.setItem('role', userRole);
          return userData;
        })
      );
  }

  isUserLoggedIn() {
    let user = localStorage.getItem('username');
    return !(user === null);
  }

  getUserRole() {
    let userRole = localStorage.getItem('role');
    if (!userRole) return null;
    return userRole;
  }

  logOut() {
    localStorage.clear();
  }


  isRegularUser(){
   let role = this.getUserRole() === "ROLE_USER" ? true : false;
   
   return role
  }

  isAdminUser(){
    let role =  this.getUserRole() === "ROLE_ADMIN" ? true : false;
    
    return role
  }


}
