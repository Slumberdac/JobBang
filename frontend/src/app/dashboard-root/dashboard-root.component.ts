import { Component } from '@angular/core';
import { DashboardEnterpriseComponent } from '../dashboard-enterprise/dashboard-enterprise.component';
import { DashboardUserComponent } from '../dashboard-user/dashboard-user.component';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DashboardEnterpriseComponent,
    DashboardUserComponent,
  ],
  templateUrl: './dashboard-root.component.html',
  styleUrl: './dashboard-root.component.scss',
})
export class DashboardRootComponent {
  private authService = new AuthService();
  user = this.authService.userInfo;
  constructor() {}
}
