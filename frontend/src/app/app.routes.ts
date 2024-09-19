import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { SignUpUserComponent } from './sign-up-user/sign-up-user.component';
import { AppRootComponent } from './app-root/app-root.component';
import { DashboardRootComponent } from './dashboard-root/dashboard-root.component';
import { EmployerGuard } from './guards/employer.guard';
import { AddOfferComponent } from './add-offer/add-offer.component';

export const routes: Routes = [
  {
    path: '',
    component: AppRootComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardRootComponent,
      },
      {
        path: 'offers/new',
        component: AddOfferComponent,
        canActivate: [EmployerGuard],
      },
    ],
  },
  { path: 'sign-up', component: SignUpUserComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: UserHomeComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'dashboard' },
];
