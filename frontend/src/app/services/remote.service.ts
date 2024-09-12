import { Injectable } from '@angular/core';
import { User, UserLogin } from '../interfaces/user.interface';
import { register } from 'module';
import { MockDBService } from './mockdb.service';
import {
  RemoteAnswers,
  RemoteErrors,
} from '../interfaces/remote-answers.interface';

/**
 * For now this will be mocked, but in the future this will be used to make remote calls to the server
 */
@Injectable({
  providedIn: 'root',
})
export class RemoteService {
  mockDB: MockDBService = new MockDBService();

  constructor() {}

  /**
   * Mocking a call to the server
   * @param username
   * @param password
   * @returns
   */
  login(userLogin: UserLogin): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.mockDB.getUserByEmail(userLogin.email).then((user) => {
          if (user && user.password === userLogin.password) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      }, 1000);
    });
  }

  register(user: User): Promise<RemoteAnswers> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.mockDB.addUser(user));
      }, 1000);
    });
  }
}
