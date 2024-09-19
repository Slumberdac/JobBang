import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-enterprise',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule],
  templateUrl: './dashboard-enterprise.component.html',
  styleUrl: './dashboard-enterprise.component.scss',
})
export class DashboardEnterpriseComponent {
  private authService = new AuthService();
  user = this.authService.userInfo;
}
