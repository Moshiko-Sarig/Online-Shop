import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import UserModel from '../../../models/User';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  step: number = 1;
  user: UserModel;
  newUser: UserModel = new UserModel(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
  confirmPassword: string;
  errors: any;

  constructor(private userService: UserService, private router:Router) { }

  nextStep() {
    if (this.step === 1) {
      const { user_id, user_email, user_password } = this.newUser;
      if (!user_id || user_id.toString().length !== 5) {
        return alert('ID must be 5 characters long!');
      }
      if (!user_email) {
        return alert('Email is required!');
      }

      if (!user_password || user_password.length < 4) {
        return alert('Password must be at least 4 characters long!');
      }

      if (!this.confirmPassword || user_password !== this.confirmPassword) {
        console.log(`the password is ${user_password} and the confirm is ${this.confirmPassword}`);
        return alert('Passwords do not match!');
      }

      // check if the ID and email already exist
      this.userService.checkUserExists({ user_id: (user_id), user_email })
        .then((response: any) => {
          if (response.exists) {
            return alert('The user with this ID and/or email already exists.');
          } else {
            this.step = 2;
          }
        });
    }
    else if (this.step === 2) {
      const { user_first_name, user_last_name, user_city, user_street } = this.newUser;

      if (!user_first_name) {
        return alert('First name is required!');
      }

      if (!user_last_name) {
        return alert('Last name is required!');
      }
      if (!user_city || user_city === '*') {
        return alert('City is required!');
      }

      if (!user_street) {
        return alert('Street is required!');
      }

      this.user = new UserModel(Number((this.newUser.user_id)), user_first_name, user_last_name, this.newUser.user_email, this.newUser.user_password, user_city, user_street, false);
      this.userService.registerUser(this.user)
      .subscribe((response: any) => {
        console.log(response);
        if (response.success) {
          alert('User registered successfully!');
          this.userService.login({user_email: this.newUser.user_email, user_password: this.newUser.user_password})
          .then(() => {
            this.userService.decodeToken();
            this.router.navigate(['/products']);
          });
        } else {
          console.log(response.error);
          alert('There was an error while registering the user.');
        }
      });
    }
  }
}