import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import validator from 'validator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorStateMatcher } from '@angular/material/core';
import { StrongPasswordRegx } from '../constants/regex';
import { confirmPasswordValidator } from '../validators/confirm-password.validator';
import {
  getAllErrorsInFormGroup,
  markAllAsTouched,
} from '../utils/formgroup.util';
import { RemoteService } from '../services/remote.service';
import { User } from '../interfaces/user.interface';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatStepperModule } from '@angular/material/stepper';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

export class ConfirmPasswordErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    const hasPasswordDontMatchError =
      form && form.errors && form.errors['PasswordsDontMatch'];
    return !!(
      control &&
      (control.invalid || hasPasswordDontMatchError) &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-sign-up-user',
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
    MatButtonToggleModule,
    MatStepperModule,
  ],
  templateUrl: './sign-up-user.component.html',
  styleUrl: './sign-up-user.component.scss',
})
export class SignUpUserComponent {
  //Create the services
  private remoteService: RemoteService = new RemoteService();
  private router: Router = new Router();

  //Form Controls
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  firstNameFormControl = new FormControl('', [Validators.required]);
  lastNameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(StrongPasswordRegx),
  ]);
  confirmPasswordFormControl = new FormControl('', [Validators.required]);
  acceptConditionsFormControl = new FormControl('', [Validators.required]);

  //Form Groups
  passwordGroup = new FormGroup(
    {
      password: this.passwordFormControl,
      confirmPassword: this.confirmPasswordFormControl,
    },
    { validators: confirmPasswordValidator }
  );
  firstFormGroup = new FormGroup({
    email: this.emailFormControl,
    firstName: this.firstNameFormControl,
    lastName: this.lastNameFormControl,
    acceptConditions: this.acceptConditionsFormControl,
    passwordGroup: this.passwordGroup,
  });

  accountTypeFormControl = new FormControl('', [Validators.required]);
  secondFormGroup = new FormGroup({
    isCandidate: this.accountTypeFormControl,
  });



  //Error State Matchers
  matcher = new MyErrorStateMatcher();
  confirmPasswordMatcher = new ConfirmPasswordErrorStateMatcher();

  //Variables
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;
  unknownError: string = '';

  constructor() {}

  signUpUser() {
    markAllAsTouched(this.firstFormGroup);
    markAllAsTouched(this.passwordGroup);
    if (getAllErrorsInFormGroup(this.firstFormGroup).length == 0) {
      console.log('registering user');
      // Call the service to sign up the user
      const user: User = {
        email: this.emailFormControl.value ?? '',
        firstName: this.firstNameFormControl.value ?? '',
        lastName: this.lastNameFormControl.value ?? '',
        password: this.passwordFormControl.value ?? '',
        isCandidate: this.accountTypeFormControl.value === 'candidate',
      };
      this.remoteService.register(user).then((success) => {
        if (success.success) {
          this.navigateToLogin();
        } else if (success.errors) {
          if (success.errors['email']) {
            this.emailFormControl.setErrors({ emailTaken: true });
          }
        } else {
          this.unknownError =
            'There was an unknown error, please try again later';
        }
      });
    }
  }
  navigateToLogin() {
    this.router.navigate(['/login'], {
      state: { email: this.emailFormControl.value },
    });
  }
}
