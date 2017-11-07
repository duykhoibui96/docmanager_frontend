import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  TOKEN = localStorage.getItem("token");
  role = localStorage.getItem("role");

  save(data) {

    this.TOKEN = data.token;
    this.role = data.role;
    localStorage.setItem("token",data.token);
    localStorage.setItem("role",data.role);

  }

  clear() {

    this.TOKEN = null;
    this.role = null;
    localStorage.removeItem("token");
    localStorage.removeItem("role");

  }

}
