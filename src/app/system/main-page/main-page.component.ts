import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  NgForm,
  Validators,
  AbstractControl
} from "@angular/forms";
import { User } from "src/app/shared/models/user.model";
import { UsersService } from "src/app/shared/services/users.service";

@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.css"]
})
export class MainPageComponent implements OnInit {
  firstNameControl: string;
  lastNameControl: string;
  userNameControl: string;
  emailFormControl: string;
  phoneFormControl: number;

  users: User[] = [];
  public searchForm: FormGroup;

  constructor(private userservice: UsersService) {}

  ngOnInit() {
    this.searchForm = new FormGroup({
      firstNameControl: new FormControl("", [
        Validators.required,
        Validators.maxLength(20)
      ]),
      lastNameControl: new FormControl("", [Validators.maxLength(20)]),
      userNameControl: new FormControl("", [Validators.maxLength(20)]),
      emailFormControl: new FormControl("", [
        Validators.pattern(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ]),
      phoneFormControl: new FormControl("", [
        Validators.maxLength(20),
        Validators.minLength(5),
        Validators.pattern(/^\d+$/)
      ])
    });
  }

  onClear() {
    console.log("CLEAR");
    this.searchForm.reset({
      firstNameControl: null,
      lastNameControl: null,
      userNameControl: null,
      emailFormControl: null,
      phoneFormControl: null
    });
  }
  hasError(controlName: string, errorName: string) {
    return this.searchForm.controls[controlName].hasError(errorName);
  }
  check(item, prop, user) {
    const propArr = Object.keys(item);
    return propArr.some(k => {
      let first = user[prop].toString().toLowerCase();
      let sec = item[k].toString().toLowerCase();

      return first === sec;
    });
  }
  searchUser() {
    this.users = [];
    const user: User = {
      firstName: this.searchForm.controls.firstNameControl.value,
      lastName: this.searchForm.controls.lastNameControl.value,
      login: this.searchForm.controls.userNameControl.value,
      email: this.searchForm.controls.emailFormControl.value,
      phoneNumber: this.searchForm.controls.phoneFormControl.value
    };

    for (var key in user) {
      if (user[key] === "") {
        delete user[key];
      }
    }
    console.log(user);

    this.userservice.searchUser().subscribe(
      users => {
        users.forEach(item => {
          for (var key in item) {
            if (
              String(item[key]).toLowerCase() ===
              String(user[key]).toLowerCase()
            ) {
              if (this.users.includes(item)) {
                continue;
              } else {
                this.users.push(item);
              }
            }
          }
        });
      },
      null,
      () => {
        console.log(this.users);
      }
    );
  }
}
