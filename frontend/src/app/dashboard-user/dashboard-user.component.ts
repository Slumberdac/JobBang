import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatTableModule } from '@angular/material/table';
import { Offer } from '../interfaces/offer.interface';
import { RemoteService } from '../services/remote.service';

@Component({
  selector: 'app-dashboard-user',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './dashboard-user.component.html',
  styleUrl: './dashboard-user.component.scss',
})
export class DashboardUserComponent {
  private authService = new AuthService();
  private remoteService = new RemoteService();
  user = this.authService.userInfo;
  displayedColumns: string[] = ['title', 'email', 'phone', 'description'];
  dataSource = [];

  constructor() {
    this.remoteService.getOffers().then((response) => {
      if (response.success) {
        this.dataSource = response.data as any;
      }
    });
  }
}
