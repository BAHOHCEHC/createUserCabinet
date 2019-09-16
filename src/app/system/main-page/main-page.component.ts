import { Component, OnInit, AfterViewInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl
} from "@angular/forms";
import { User } from "src/app/shared/models/user.model";
import { UsersService } from "src/app/shared/services/users.service";
import {
  switchMap,
  debounceTime,
  filter,
  map,
  takeWhile
} from "rxjs/operators";
import { fadeInOut } from "src/app/shared/animations/fade.animation";

@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.css"],
  animations: [fadeInOut]
})
export class MainPageComponent implements OnInit, AfterViewInit {
  users: User[] = [];
  user: User;
  searchForm: FormGroup;
  show = false;

  constructor(private userservice: UsersService) {}
  ngAfterViewInit() {
    Object.keys(this.searchForm.controls).forEach(key => {
      this.subscribeControls(this.searchForm.controls[key], key);
    });
  }
  ngOnInit() {
    this.searchForm = new FormGroup({
      firstName: new FormControl("", [
        Validators.required,
        Validators.maxLength(20)
      ]),
      lastName: new FormControl("", [Validators.maxLength(20)]),
      login: new FormControl("", [Validators.maxLength(20)]),
      email: new FormControl("", [
        Validators.pattern(
          /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ]),
      phoneNumber: new FormControl("", [
        Validators.maxLength(20),
        Validators.minLength(5),
        Validators.pattern(/^\d+$/)
      ])
    });
  }
  onClear() {
    this.show = false;
    this.searchForm.reset({
      firstName: null,
      lastName: null,
      login: null,
      email: null,
      phoneNumber: null
    });
    this.users = [];
    Object.keys(this.searchForm.controls).forEach(key => {
      this.subscribeControls(this.searchForm.controls[key], key);
    });
  }
  hasError(controlName: string, errorName: string) {
    return this.searchForm.controls[controlName].hasError(errorName);
  }
  check(item, prop, user) {
    const propArr = Object.keys(item);
    return propArr.some(k => {
      const first = user[prop].toString().toLowerCase();
      const sec = item[k].toString().toLowerCase();
      return first === sec;
    });
  }
  searchUser() {
    this.showResult();
    Object.keys(this.searchForm.controls).forEach(key => {
      this.subscribeControls(this.searchForm.controls[key], key);
    });
  }
  showResult() {
    this.show = !this.show;
  }
  subscribeControls(currentControl: AbstractControl, key: string) {
    currentControl.valueChanges
      .pipe(
        takeWhile(value => value !== null),
        filter(value => value.length > 2),
        debounceTime(500),
        switchMap(value =>
          this.userservice.searchUser().pipe(
            map(arrays =>
              arrays.filter(user => {
                return !(
                  user[key].toLowerCase().indexOf(value.toLowerCase()) !== -1
                )
                  ? false
                  : true;
              })
            )
          )
        )
      )
      .subscribe(arr => {
        ref: for (let index = 0; index < arr.length; index++) {
          const element = arr[index];
          const same = this.users.some(e => {
            return e.id === element.id;
          });
          if (same) {
            continue ref;
          }
          this.users.push(element);
        }
        console.log(this.users);
      });
  }
}
