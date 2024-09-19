import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { WINDOW } from '../constants/window.const';
import { getLocalStorage } from '../utils/injectable.util';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class EmployerGuard implements CanActivate {
  private authService = new AuthService();
  user = this.authService.userInfo;
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.isEmployer()) {
      return true;
    }
    // navigate to dashboard if not a employer
    this.router.navigate(['/dashboard']);
    return false;
  }
  public isEmployer(): boolean {
    return !this.user?.isCandidate;
  }
}
