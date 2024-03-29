import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import userbaseUrl from './helper-user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  //add user

  public addUser(user: any) {
    return this.http.post(`${userbaseUrl}/user/`, user);
  }
}
