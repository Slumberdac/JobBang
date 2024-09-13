import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router, RouterModule } from '@angular/router';
import { MyErrorStateMatcher } from '../sign-up-user/sign-up-user.component';
import { WINDOW } from '../constants/window.const';
import { RemoteService } from '../services/remote.service';
import { FormGroup } from '@angular/forms';
import {
  getAllErrorsInFormGroup,
  markAllAsTouched,
} from '../utils/formgroup.util';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    MatSlideToggleModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private window = inject(WINDOW);
  private remoteService = new RemoteService();

  emailFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);

  formGroup = new FormGroup({
    email: this.emailFormControl,
    password: this.passwordFormControl,
  });

  matcher = new MyErrorStateMatcher();
  passwordVisible = false;
  isAfterRegister = false;
  unknownError = '';
  constructor() {
    // Get the value that was sent from the sign-up page
    const navigation = this.window.history.state;
    if (navigation) {
      console.log(navigation);
      this.emailFormControl.setValue(navigation.email);
      this.isAfterRegister = true;
    }
  }

  login() {
    markAllAsTouched(this.formGroup);
    if (getAllErrorsInFormGroup(this.formGroup).length > 0) {
      return;
    }
    this.remoteService
      .login({
        email: this.emailFormControl.value ?? '',
        password: this.passwordFormControl.value ?? '',
      })
      .then((response) => {
        console.log(response);
      });
  }
}
