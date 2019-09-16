import { Component, OnInit } from "@angular/core";
import { User } from "src/app/shared/models/user.model";
import { UsersService } from "src/app/shared/services/users.service";

@Component({
  selector: "app-search-page",
  templateUrl: "./search-page.component.html",
  styleUrls: ["./search-page.component.css"]
})
export class SearchPageComponent implements OnInit {
  displayedColumns: string[] = [
    "firstName",
    "lastName",
    "username",
    "Email",
    "phoneNumber",
    "action"
  ];
  usersData: User[] = [];

  constructor(private userservice: UsersService) {}

  ngOnInit() {
    this.userservice.getAllUser().subscribe(data => {
      this.usersData = data;
    });
  }

  update(data, event): void {
    event.stopPropagation();
    console.log(data);
    console.log(event);

    // const editDialogRef = this.dialog.open(EditClientComponent, {
    //   data: data
    // );
  }
  deleteUser(data, event): void {
    event.stopPropagation();
    console.log(data);
    console.log(event);

    // const editDialogRef = this.dialog.open(EditClientComponent, {
    //   data: data
    // );
  }
  addShipping(data, event): void {
    event.stopPropagation();
    console.log(data);
    console.log(event);

    // const editDialogRef = this.dialog.open(EditClientComponent, {
    //   data: data
    // );
  }
}
