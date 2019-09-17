import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { User, Shipping } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users.service';
import { switchMap, debounceTime, filter, map, takeWhile, tap } from 'rxjs/operators';
import { fadeInOut } from 'src/app/shared/animations/fade.animation';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogAddShippingComponent } from '../shared/components/dialogAddShipping/dialog-add-shipping.component';
import { DialogUpdateUserComponent } from '../shared/components/dialogUpdateUser/dialog-update-user.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  animations: [fadeInOut]
})
export class MainPageComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'username', 'Email', 'phoneNumber', 'action'];
  displayedColumns2: string[] = ['addressType', 'adress', 'city', 'country', 'postalCode', 'action'];

  users: User[] = [];
  user: User = null;
  useId: string = null;
  shipping: Shipping[] = [];
  searchForm: FormGroup;

  constructor(private userservice: UsersService, private dialog: MatDialog) {}
  ngAfterViewInit() {
    Object.keys(this.searchForm.controls).forEach(key => {
      this.subscribeControls(this.searchForm.controls[key], key);
    });
  }
  ngOnInit() {
    this.searchForm = new FormGroup({
      firstName: new FormControl('', [
        // Validators.required,
        Validators.maxLength(20)
      ]),
      lastName: new FormControl('', [Validators.maxLength(20)]),
      login: new FormControl('', [Validators.maxLength(20)]),
      email: new FormControl('', [        Validators.pattern(
          /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ]),
      phoneNumber: new FormControl('', [Validators.maxLength(20), Validators.minLength(5), Validators.pattern(/^\d+$/)])
    });
  }
  onClear() {
    this.searchForm.reset({
      firstName: null,
      lastName: null,
      login: null,
      email: null,
      phoneNumber: null
    });
    this.users = [];
    this.shipping = [];
    this.useId = null;
    this.user = null;
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
  deleteShipping(shipping): void {
    console.log('deleteShipping');
    const indx = this.user.shipping.indexOf(shipping);
    this.shipping = this.user.shipping.splice(indx, 1);

    this.userservice.deleteShipping(this.user).subscribe(data => {
      this.shipping = this.users[0].shipping;
    });
  }
  deleteUser(): void {
    this.userservice.deleteUser(this.user).subscribe(res => {
      this.onClear();
    });
  }
  subscribeControls(currentControl: AbstractControl, key: string) {
    currentControl.valueChanges
      .pipe(
        takeWhile(value => value !== null),
        filter(value => value.length > 1),
        debounceTime(500),
        tap(() => {
          this.users = [];
          this.shipping = [];
          this.useId = null;
          this.user = null;
        }),
        switchMap(value =>
          this.userservice.searchUser().pipe(
            map(arrays =>
              arrays.filter(user => {
                return !(user[key].toLowerCase().indexOf(value.toLowerCase()) !== -1) ? false : true;
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
        if (this.users.length) {
          this.shipping = this.users[0].shipping;
          this.useId = this.users[0].id;
          this.user = this.users[0];
        }
        console.log(this.users);
      });
  }
  updateUser(): void {
    console.log('updateUser');
  }
  updateShipping(): void {
    const dialogRef = this.dialog.open(DialogUpdateUserComponent, {
      width: '70vw',
      height: '80vh',
      data: this.users[0]
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  addShipping(): void {
    console.log('addShipping');
    const dialogRef = this.dialog.open(DialogAddShippingComponent, {
      width: '70vw',
      height: '80vh',
      data: this.users[0]
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
