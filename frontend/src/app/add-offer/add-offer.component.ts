import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterModule } from '@angular/router';
import { RemoteService } from '../services/remote.service';
import { Offer } from '../interfaces/offer.interface';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-offer',
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
  templateUrl: './add-offer.component.html',
  styleUrl: './add-offer.component.scss',
})
export class AddOfferComponent {
  private remoteService = new RemoteService();
  private _snackBar = inject(MatSnackBar);
  offerForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^[\+]?[0-9]{0,3}\W?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
      ),
    ]),
  });

  constructor() {}

  addOffer() {
    console.log(this.offerForm.value);
    if (this.offerForm.valid) {
      const offer: Offer = {
        title: this.offerForm.value.title ?? '',
        description: this.offerForm.value.description ?? '',
        email: this.offerForm.value.email ?? '',
        phone: this.offerForm.value.phone ?? '',
      };
      this.remoteService.addOffer(offer).then((response: any) => {
        if (response.success) {
          console.log('Offer added');
          this._snackBar.open("The offer was added", 'X');
          this.offerForm.reset();
        }
      });
    }
  }
}
