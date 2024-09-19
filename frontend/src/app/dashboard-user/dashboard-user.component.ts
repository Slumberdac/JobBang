import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-user.component.html',
  styleUrl: './dashboard-user.component.scss',
})
export class DashboardUserComponent {
  private authService = new AuthService();
  user = this.authService.userInfo;
}
