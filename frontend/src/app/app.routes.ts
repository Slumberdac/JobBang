import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { SignUpEnterpriseComponent } from './sign-up-enterprise/sign-up-enterprise.component';
import { SignUpUserComponent } from './sign-up-user/sign-up-user.component';
import { LoginEnterpriseComponent } from './login-enterprise/login-enterprise.component';
import { EnterpriseDashboardComponent } from './enterprise-dashboard/enterprise-dashboard.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'sign-up', component: SignUpUserComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: UserHomeComponent,
    canActivate: [AuthGuard],
  },
  { path: 'enterprise/sign-up', component: SignUpEnterpriseComponent },
  { path: 'enterprise/login', component: LoginEnterpriseComponent },
  {
    path: 'enterprise/dashboard',
    component: EnterpriseDashboardComponent,
    canActivate: [AuthGuard],
  },
];
