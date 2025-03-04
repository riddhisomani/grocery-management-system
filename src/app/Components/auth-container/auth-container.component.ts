import { Component } from '@angular/core';
import { AuthFormService } from '../../Services/auth-form.service';
import { AuthFormComponent } from '../auth-form/auth-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-container',
  imports: [AuthFormComponent, CommonModule],
  templateUrl: './auth-container.component.html',
  styleUrl: './auth-container.component.css'
})
export class AuthContainerComponent {
  currentForm: 'login' | 'signup' = 'login';
  message: string = '';
  messageType: 'success' | 'error' = 'success';

  constructor(
    private authFromService: AuthFormService, 
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['mode'] === 'login' || params['mode'] === 'signup') {
        this.currentForm = params['mode'];
      }
    });
  }

  switchForm(formType: 'login' | 'signup') {
    this.currentForm = formType;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { mode: formType },
      queryParamsHandling: 'merge'
    });
    this.message = '';
  }

  handleSubmit(formData: {name: string, password: string}) {
    if (this.currentForm === 'signup') {
      const success = this.authFromService.signup(formData.name, formData.password);
      if (success) {
        this.message = 'Account created successfully! Please login.';
        this.messageType = 'success';
      }
    } else {
      const success = this.authFromService.login(formData.name, formData.password);
      if (!success) {
        this.message = 'Invalid name or password.';
        this.messageType = 'error';
      }
    }
  }
}
