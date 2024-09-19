import { Inject, inject, Injectable } from '@angular/core';
import { User, UserLogin } from '../interfaces/user.interface';
import { WINDOW } from '../constants/window.const';
import {
  RemoteAnswers,
  RemoteErrors,
} from '../interfaces/remote-answers.interface';
import { DOCUMENT } from '@angular/common';
import { getWindow } from '../utils/injectable.util';
import { Offer } from '../interfaces/offer.interface';

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
  offers: Offer[] = [];

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
    const offers = this.localStorage?.getItem('offers') ?? '';

    // Parse all data from the local storage
    try {
      this.users = JSON.parse(users);
    } catch (error) {
      this.users = [];
    }
    try {
      this.offers = JSON.parse(offers);
    } catch (error) {
      this.offers = [];
    }
  }

  updateLocalStorage() {
    this.localStorage?.setItem('users', JSON.stringify(this.users));
    this.localStorage?.setItem('offers', JSON.stringify(this.offers));
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

  addOffer(offer: Offer): Promise<RemoteAnswers<string>> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.offers.push(offer);
        this.updateLocalStorage();
        resolve({ success: true, data: 'Offer added' });
      }, 1000);
    });
  }

  getOffers(): Promise<RemoteAnswers<Offer[]>> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ success: true, data: this.offers });
      }, 1000);
    });
  }
}
