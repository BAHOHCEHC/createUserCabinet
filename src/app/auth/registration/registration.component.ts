import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;

  constructor(private usersService: UsersService, private router: Router, private title: Title) {
    title.setTitle('Registration');
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this)),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      login: new FormControl(null, [Validators.required]),
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      phoneNumber: new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    const user = new User(
      this.form.controls.email.value,
      this.form.controls.password.value,
      this.form.controls.login.value,
      this.form.controls.firstName.value,
      this.form.controls.lastName.value,
      this.form.controls.phoneNumber.value
    );

    this.usersService.createNewUser(user).subscribe(() => {
      this.router.navigate(['/login'], {
        queryParams: {
          nowCanLogin: true
        }
      });
    });
  }

  forbiddenEmails(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.usersService.getUserByEmail(control.value).subscribe((user: User) => {
        if (user) {
          resolve({ forbiddenEmail: true });
        } else {
          resolve(null);
        }
      });
    });
  }
}
