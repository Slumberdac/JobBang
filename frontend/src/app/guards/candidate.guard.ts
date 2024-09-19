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
export class CandidateGuard implements CanActivate {
  private authService = new AuthService();
  user = this.authService.userInfo;
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.isCandidate()) {
      return true;
    }
    // navigate to dashboard if not a candidate
    this.router.navigate(['/dashboard']);
    return false;
  }
  public isCandidate(): boolean {
    return this.user?.isCandidate ?? false;
  }
}
