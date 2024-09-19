import { Component } from '@angular/core';
import { SideNavCandidateComponent } from '../side-nav-candidate/side-nav-candidate.component';
import { SideNavEmployerComponent } from '../side-nav-employer/side-nav-employer.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [
    CommonModule,
    SideNavCandidateComponent,
    SideNavEmployerComponent,
    MatSidenavModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
})
export class SideNavComponent {
  private authService = new AuthService();
  private router: Router = new Router();

  user = this.authService.userInfo;

  isOpen = true;

  constructor() {}

  navigateToDashboard() {
    this.isOpen = false;
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
