// import { Http, Response } from '@angular/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, mergeMap, filter, find, tap } from "rxjs/operators";

import { User } from "../models/user.model";
import { BaseApi } from "../core/base-api";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UsersService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.get(`users?email=${email}`).pipe(
      map((users: User[]) => (users[0] ? users[0] : undefined))
    );
  }

  createNewUser(user: User): Observable<User> {
    return this.post("users", user);
  }

  searchUser(): Observable<User[]> {
    return this.get(`users`);
  }
  // searchUser(user: User): Observable<any> {
  //   return this.get(`users`).pipe(
  //     map((users: User[]) =>
  //       users.filter(p => {
  //         return p.firstName.toLowerCase() === user.firstName.toLowerCase();
  //       })
  //     )
  //   );
  // }
}
