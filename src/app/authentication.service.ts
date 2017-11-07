import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {

  private token: string = null;
  private role: string;
  constructor() {

    this.token = localStorage.getItem('token');
    this.role = localStorage.getItem('role');

  }

  save(data: Object) {

    this.token = data['token'];
    this.role = data['role'];
    localStorage.setItem('token', this.token);
    localStorage.setItem('role', this.role);

  }

  clear() {

    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('role');

  }

  getToken() {

    return this.token;

  }

  getRole() {

    return this.role;

  }

  isLoggedIn(): Boolean {

    return this.getToken() != null;

  }


}
