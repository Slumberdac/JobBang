import { inject, Injectable } from '@angular/core';
import { User, UserLogin } from '../interfaces/user.interface';
import { WINDOW } from '../constants/window.const';
import {
  RemoteAnswers,
  RemoteErrors,
} from '../interfaces/remote-answers.interface';

/**
 * This service will be used to mock the database
 */
@Injectable({
  providedIn: 'root',
})
export class MockDBService {
  private _window: Window = inject(WINDOW);
  users: User[] = [];

  constructor() {
    // Adds an event listener to the window object that will listen for update requests
    this._window.addEventListener('updateDB', (event) => {
      this.updateDB();
    });
  }

  updateDB() {
    //Get the users from the local storage
    const users = localStorage.getItem('users') ?? '';

    // Parse all data from the local storage
    try {
      this.users = JSON.parse(users);
    } catch (error) {
      this.users = [];
    }
  }

  updateLocalStorage() {
    localStorage.setItem('users', JSON.stringify(this.users));
    this._window.dispatchEvent(new Event('updateDB'));
  }

  addUser(user: User): Promise<RemoteAnswers> {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        if ((await this.getUserByEmail(user.email)) !== undefined) {
          resolve({
            success: false,
            data: '',
            errors: { email: 'Email already exists' },
          });
        } else {
          this.users.push(user);
          this.updateLocalStorage();
          resolve({ success: true, data: 'User added' });
        }
      }, 1000);
    });
  }

  getUserByEmail(email: string): Promise<User | undefined> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find((u) => u.email === email);
        resolve(user);
      }, 1000);
    });
  }
}
