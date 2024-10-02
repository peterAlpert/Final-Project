import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-bank-transfer',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './bank-transfer.component.html',
  styles: ``
})
export class BankTransferComponent {

  visaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.visaForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{14}$')]],
      cardHolder: ['', Validators.required],
      expiryDate: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
    });
  }

  onSubmit() {
    if (this.visaForm.valid) {
      console.log(this.visaForm.value);

    }
  }

}
