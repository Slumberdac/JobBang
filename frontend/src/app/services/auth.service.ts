import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { getLocalStorage, getWindow } from '../utils/injectable.util';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private window = getWindow();
  private localStorage = getLocalStorage();
  isLoggedIn: boolean = false;
  userInfo: User | undefined;

  constructor() {
    this.getLocalData();
    // Adds an event listener to the window object that will listen for update requests
    this.window?.addEventListener('sessionDataUpdated', (event) => {
      this.getLocalData();
    });
  }

  getLocalData() {
    this.isLoggedIn = this.localStorage?.getItem('isLoggedIn') === 'true';
    const localUser = this.localStorage?.getItem('user');
    if (localUser) {
      try {
        this.userInfo = JSON.parse(localUser);
      } catch (error) {
        console.log(error);
      }
    } else {
      this.userInfo = undefined;
    }
  }
}
