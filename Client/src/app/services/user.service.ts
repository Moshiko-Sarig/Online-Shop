import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINTS } from '../../Utils/api.endpoints';
import { TokenService } from './token.service';
import jwt_decode from 'jwt-decode';
import UserModel from 'src/models/User';


export interface DecodedToken {
  user: {
    user_id: number;
    user_first_name: string;
    user_last_name: string;
    user_email: string;
    user_city: string;
    user_street: string;
    user_is_admin: boolean;
  };
  iat: number;
  exp: number;
}

export interface LoginData {
  user_email: string;
  user_password: string;
}

export interface LoginResponse extends LoginData {
  token: string;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient, private tokenService: TokenService) { }

  loginUrl = ENDPOINTS.LOGIN;
  private userInfo: DecodedToken;
  private user: any;
  private _isLoggedIn = false;

  async login(login: LoginData): Promise<LoginData | undefined> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    try {
      const response = await this.http.post<LoginResponse>(this.loginUrl, login, { headers }).toPromise();
      if (response && response.token) {
        this.tokenService.setToken(response.token);
        this._isLoggedIn = true;
      }
      return response;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  setUserInfo(info: DecodedToken) {
    this.userInfo = info;
    this._isLoggedIn = !!info;
  }

  decodeToken() {
    const token = this.tokenService.getToken();
    if (token) {
      this.userInfo = jwt_decode(token) as DecodedToken;
      this.user = this.userInfo.user;
      this._isLoggedIn = true;
    }
  }

  getUserInfo(): DecodedToken {
    return this.userInfo;
  }

  get isLoggedIn() {
    return this._isLoggedIn;
  }

  registerUser(user: UserModel) {
    const newUser = {
      user_id: user.user_id,
      user_first_name: user.user_first_name,
      user_last_name: user.user_last_name,
      user_email: user.user_email,
      user_password: user.user_password,
      user_city: user.user_city,
      user_street: user.user_street,
      user_is_admin: user.user_is_admin
    };

    return this.http.post<UserModel>('http://localhost:4000/api/register', newUser);
  }


  checkUserExists(user: { user_id: any, user_email: any }): Promise<any> {
    return this.http.get<any>(`http://localhost:4000/api/check/user/exists/${user.user_id}/${user.user_email}`).toPromise();
  }

}
