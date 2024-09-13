import { Inject, inject, Injectable } from '@angular/core';
import { User, UserLogin } from '../interfaces/user.interface';
import { WINDOW } from '../constants/window.const';
import {
  RemoteAnswers,
  RemoteErrors,
} from '../interfaces/remote-answers.interface';
import { DOCUMENT } from '@angular/common';
import { getWindow } from '../utils/injectable.util';

/**
 * This service will be used to mock the database
 */
@Injectable({
  providedIn: 'root',
})
export class MockDBService {
  private window = getWindow();
  private localStorage = this.window?.localStorage;
  users: User[] = [];

  constructor() {
    // Adds an event listener to the window object that will listen for update requests
    this.window?.addEventListener('updateDB', (event) => {
      this.updateDB();
    });
    this.updateDB();
  }

  updateDB() {
    //Get the users from the local storage
    const users = this.localStorage?.getItem('users') ?? '';

    // Parse all data from the local storage
    try {
      this.users = JSON.parse(users);
    } catch (error) {
      this.users = [];
    }
  }

  updateLocalStorage() {
    this.localStorage?.setItem('users', JSON.stringify(this.users));
    this.window?.dispatchEvent(new Event('updateDB'));
  }

  addUser(user: User): Promise<RemoteAnswers<string>> {
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
    console.log(email);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find((u) => {
          return u.email.toLowerCase() === email.toLowerCase();
        });
        resolve(user);
      }, 1000);
    });
  }
}
