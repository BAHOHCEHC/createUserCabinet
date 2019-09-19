import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from './../../shared/services/users.service';
import { User } from 'src/app/shared/models/user.model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-create-user-page',
  templateUrl: './create-user-page.component.html',
  styleUrls: ['./create-user-page.component.css']
})
export class CreateUserPageComponent implements OnInit {
  createUserForm: FormGroup;
  minPw = 8;
  constructor(private route: ActivatedRoute, private router: Router, private usersService: UsersService) {}

  ngOnInit() {
    this.createUserForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      password: new FormGroup(
        {
          pass1: new FormControl('', [Validators.required, Validators.minLength(this.minPw)]),
          pass2: new FormControl('', [Validators.required, Validators.minLength(this.minPw)])
        },
        this.passwordMatchValidator
      ),
      login: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ]),
      phoneNumber: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(5), Validators.pattern(/^\d+$/)])
    });
  }

  passwordMatchValidator: ValidatorFn = (password: FormGroup): ValidationErrors | null => {
    if (password.get('pass1').value === password.get('pass2').value) {
      return null;
    } else {
      password.get('pass2').setErrors([{ confirmedDoesNotMatch: true }]);
    }
  };
  next(form) {
    const user = {
      email: form.controls.email.value,
      firstName: form.controls.firstName.value,
      lastName: form.controls.lastName.value,
      login: form.controls.login.value,
      password: form.controls.password.value.pass1,
      phoneNumber: form.controls.phoneNumber.value
    };

    window.localStorage.setItem('createUser', JSON.stringify(user));
    this.router.navigate(['/system', 'shipping']);
  }
  onClear() {
    this.createUserForm.reset({
      firstName: null,
      lastName: null,
      login: null,
      email: null,
      phoneNumber: null
    });
    localStorage.removeItem('createUser');
  }
}
