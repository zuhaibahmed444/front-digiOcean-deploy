import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import userbaseUrl from './helper-user';
import exambaseUrl from './helper-exam';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public loginStatusSubject = new Subject<boolean>();
  uss;
  constructor(private http: HttpClient) {}

  //current user: which is loggedin
  public getCurrentUser() {
    return this.http.get(`${userbaseUrl}/current-user`);
  }

  //get user count
  //current user: which is loggedin
  public getUserCount() {
    return this.http.get(`${userbaseUrl}/user/count`);
  }

  //get category count
  public getCategoryCount() {
    return this.http.get(`${exambaseUrl}/category/count`);
  }

  //get category count
  public getQuizCount() {
    return this.http.get(`${exambaseUrl}/quiz/count`);
  }

  //generate token

  public generateToken(loginData: any) {
    return this.http.post(`${userbaseUrl}/generate-token`, loginData);
  }

  //login user: set token in localStorage
  public loginUser(token) {
    localStorage.setItem('token', token);

    return true;
  }

  //isLogin: user is logged in or not
  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  // logout : remove token from local storage
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //get token
  public getToken() {
    return localStorage.getItem('token');
  }

  //set userDetail
  public setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  //getUser
  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  //get user role

  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  public getUsersub() {
    let user = this.getUser();
    return user.subscribed
  }

  public getCount(){
    let count = this.getUserCount();
    return count
  }

  public getCatCount(){
    let count1 = this.getCategoryCount();
    return count1
  }

  public getQuCount(){
    let count2 = this.getQuizCount();
    return count2
  }

  public getupdateUser(){
    this.getCurrentUser().subscribe((data:any)=>{
      this.uss = data
      this.setUser(this.uss)
    })
    
  }

  
  
  public updateUser(){
    let uss = this.getUser();
    uss.subscribed = true
    this.setUser(uss)
    console.log(uss)
  }
}
