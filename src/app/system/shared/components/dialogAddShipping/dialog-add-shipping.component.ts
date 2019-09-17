import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-dialog-add-shipping',
  templateUrl: './dialog-add-shipping.component.html',
  styleUrls: ['./dialog-add-shipping.component.css']
})
export class DialogAddShippingComponent {
  constructor(public dialogRef: MatDialogRef<DialogAddShippingComponent>, @Inject(MAT_DIALOG_DATA) public user: User) {
    console.log(user);
  }

  save() {
    console.log('aaaaaaaaaaa', this.user);
  }
  close() {
    this.dialogRef.close();
  }
}
