// auth-form.component.ts
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css'
})
export class AuthFormComponent implements OnInit {
  @Input() formType: 'login' | 'signup' = 'signup';
  @Output() submitForm = new EventEmitter<{name: string, password: string}>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
  
    if (this.formType === 'signup') {
      this.form = this.fb.group({
        name: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]]
      }, { validators: this.createPasswordMatchValidator() });
    } else {
      this.form = this.fb.group({
        name: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    }
  }

  createPasswordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;
      
      return password === confirmPassword ? null : { notMatching: true };
    };
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitForm.emit({
        name: this.form.get('name')?.value,
        password: this.form.get('password')?.value
      });
    }
  }
}