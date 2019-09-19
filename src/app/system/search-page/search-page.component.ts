import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users.service';
import { DialogUpdateUserComponent } from '../shared/components/dialogUpdateUser/dialog-update-user.component';
import { MatDialog } from 'src/app/barel';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'username', 'Email', 'phoneNumber', 'action'];
  usersData: User[] = [];

  constructor(private userservice: UsersService, private dialog: MatDialog) {}

  ngOnInit() {
    this.userservice.getAllUser().subscribe(data => {
      this.usersData = data;
    });
  }
  updateUser(user): void {
    const dialogRef = this.dialog.open(DialogUpdateUserComponent, {
      width: '70vw',
      height: '45vh',
      data: user
    });
  }
  deleteUser(user): void {
    this.userservice.deleteUser(user).subscribe(e => {
      this.userservice.getAllUser().subscribe(data => {
        this.usersData = data;
      });
    });
  }
}
