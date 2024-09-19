import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatTableModule } from '@angular/material/table';
import { Offer } from '../interfaces/offer.interface';

const OFFERS_DATA: Offer[] = [
  {
    title: 'Accountant',
    email: 'rh@youraccountant.com',
    phone: '111-111-1111',
    description: 'We are looking for an accountant to join our team.',
  },
  {
    title: 'Software Developer',
    email: 'rh@yourdeveloper.com',
    phone: '222-222-2222',
    description: 'We are looking for a software developer to join our team.',
  },
  {
    title: 'Project Manager',
    email: 'rh@yourmanager.com',
    phone: '333-333-3333',
    description: 'We are looking for a project manager to join our team.',
  },
];

@Component({
  selector: 'app-dashboard-user',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './dashboard-user.component.html',
  styleUrl: './dashboard-user.component.scss',
})
export class DashboardUserComponent {
  private authService = new AuthService();
  user = this.authService.userInfo;
  displayedColumns: string[] = ['title', 'email', 'phone', 'description'];
  dataSource = OFFERS_DATA;
}
