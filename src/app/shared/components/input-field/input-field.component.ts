import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true,
    },
  ],
})
export class InputFieldComponent implements OnInit {
  @Input() inputType: 'mobile' | 'text' | 'email' | 'password' | 'auth-code';
  @Input() placeholder: string = '';
  @Input() isRequired: boolean = true;
  @Input() inputValue: FormControl = new FormControl('', []);

  ngOnInit(): void {
    this.updateValidators();
  }

  getInputType() {
    return this.inputType === 'password' ? 'password' : 'text';
  }

  updateValidators() {
    if (this.isRequired) {
      this.inputValue.setValidators(Validators.required);
    }
    if (this.inputType === 'email') {
      this.inputValue.addValidators(Validators.email);
    } else if (this.inputType === 'mobile') {
      this.inputValue.addValidators(Validators.pattern(/^\+65[89]\d{7}$/));
    }
    this.inputValue.updateValueAndValidity();
  }
}
