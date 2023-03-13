import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  private readonly TOKEN_KEY = 'token';
  private readonly EXPIRATION_TIME_KEY = 'expiration_time';
  private readonly EXPIRATION_TIME = 30 * 60 * 1000; // *30 minutes in milliseconds


  setToken(token: string) {
    const expirationTime = Date.now() + this.EXPIRATION_TIME;
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.EXPIRATION_TIME_KEY, expirationTime.toString());
    console.log("Token Saved");
  }

  getToken(): string | null {
    const expirationTime = Number(localStorage.getItem(this.EXPIRATION_TIME_KEY));
    if (expirationTime && expirationTime > Date.now()) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    else {
      this.removeToken();
      console.warn('Token not found or expired Please login.');
      return null;
    }
  }

  removeToken() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.EXPIRATION_TIME_KEY);
  }
}
