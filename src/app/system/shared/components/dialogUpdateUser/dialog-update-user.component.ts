import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-dialog-update-user',
  templateUrl: './dialog-update-user.component.html'
})
export class DialogUpdateUserComponent implements OnInit {
  updateForm: FormGroup;

  constructor(private userservice: UsersService, public dialogRef: MatDialogRef<DialogUpdateUserComponent>, @Inject(MAT_DIALOG_DATA) public user) {}

  ngOnInit() {
    this.updateForm = new FormGroup({
      firstName: new FormControl(this.user.firstName, [Validators.required]),
      lastName: new FormControl(this.user.lastName, [Validators.required]),
      login: new FormControl(this.user.login, [Validators.required]),
      email: new FormControl(this.user.email, [Validators.required]),
      phoneNumber: new FormControl(this.user.phoneNumber, [Validators.required])
    });
  }

  save() {
    this.user.firstName = this.updateForm.controls.firstName.value;
    this.user.lastName = this.updateForm.controls.lastName.value;
    this.user.login = this.updateForm.controls.login.value;
    this.user.email = this.updateForm.controls.email.value;
    this.user.phoneNumber = this.updateForm.controls.phoneNumber.value;

    this.userservice.updateUser(this.user).subscribe(e => {
      this.close();
    });
  }

  close() {
    this.dialogRef.close();
  }
}
