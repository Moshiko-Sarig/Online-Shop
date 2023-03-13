import { CanActivate, Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(): boolean {
    if (!this.userService.getUserInfo().user.user_is_admin) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
