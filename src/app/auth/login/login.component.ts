import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { fadeStateTrigger } from "src/app/shared/animations/fade.animation";
import { Message } from "src/app/shared/models/message.model";
import { UsersService } from "src/app/shared/services/users.service";
import { AuthService } from "src/app/shared/services/auth.service";
import { User } from "src/app/shared/models/user.model";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  animations: [fadeStateTrigger]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  message: Message;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.message = new Message("danger", "");

    this.route.queryParams.subscribe((params: Params) => {
      if (params["nowCanLogin"]) {
        this.showMessage({
          text: "Now you can login in cabinet",
          type: "success"
        });
      } else if (params["accessDenied"]) {
        this.showMessage({
          text: "You need to login",
          type: "warning"
        });
      }
    });

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ])
    });
  }

  private showMessage(message: Message) {
    this.message = message;

    window.setTimeout(() => {
      this.message.text = "";
    }, 3000);
  }

  onSubmit() {
    const formData = this.form.value;

    this.usersService.getUserByEmail(formData.email).subscribe((user: User) => {
      if (user) {
        if (user.password === formData.password) {
          this.message.text = "";
          window.localStorage.setItem("user", JSON.stringify(user));
          this.authService.login();
          this.router.navigate(['/system', 'mainpage']);
          // this.router.navigate(["/registration"]);
        } else {
          this.showMessage({
            text: "Password incorrect",
            type: "danger"
          });
        }
      } else {
        this.showMessage({
          text: "That users does not exist",
          type: "danger"
        });
      }
    });
  }
}
