import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthFormService } from '../../Services/auth-form.service'; 

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authFormService: AuthFormService, private router: Router) {}
  
  canActivate(): boolean {
    if (this.authFormService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
  }
}