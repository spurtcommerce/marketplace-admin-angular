import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  dataSharing: any = {};
  verifydetail: any = {}

  constructor() { }

  private newUser = new BehaviorSubject<any>({
    'data': this.dataSharing,
  });

  private UserServices = new BehaviorSubject<any>({
    'data': this.verifydetail,
  });

  setUserInfo(user: any) {

    this.UserServices.next(user);
  }

  getUserInfo() {
    return this.UserServices.asObservable();
  }

  setNewUserInfo(user: any) {

    this.newUser.next(user);
  }

  getNewUserInfo() {
    return this.newUser.asObservable();
  }
}
