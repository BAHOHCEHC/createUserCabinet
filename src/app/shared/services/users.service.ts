import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User, Shipping } from '../models/user.model';
import { BaseApi } from '../core/base-api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.get(`users?email=${email}`).pipe(map((users: User[]) => (users[0] ? users[0] : undefined)));
  }

  createNewUser(user: User): Observable<User> {
    return this.post('users', user);
  }

  searchUser(): Observable<User[]> {
    return this.get(`users`);
  }
  getAllUser(): Observable<User[]> {
    return this.get(`users`);
  }
  deleteShipping(user: User): Observable<User> {
      return this.put(`users/${user.id}/`, user);
  }
  deleteUser(user: User): Observable<User> {
      return this.delete(`users/${user.id}`);
  }
}
