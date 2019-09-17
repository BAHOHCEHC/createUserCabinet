import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-dialog-update-user',
  templateUrl: './dialog-update-user.component.html',
  styleUrls: ['./dialog-update-user.component.css']
})
export class DialogUpdateUserComponent {
  constructor(public dialogRef: MatDialogRef<DialogUpdateUserComponent>, @Inject(MAT_DIALOG_DATA) public user: User) {
    console.log(user);
  }

  save() {
    console.log('aaaaaaaaaaa', this.user);
  }
  close() {
    this.dialogRef.close();
  }
}
