// auth-form.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthFormService {
  private user: {name: string, password: string} | null = null;
  private isAuthenticated = false;
  
  constructor(private router: Router) {}
  
  signup(name: string, password: string): boolean {
    this.user = { name, password };
    console.log('User signed up:', name);
    this.router.navigate(['/auth'], { queryParams: { mode: 'login' } });
    return true;
  }

  login(name: string, password: string): boolean {
    const isValid = this.user?.name === name && this.user?.password === password;
    if (isValid) {
      this.isAuthenticated = true;
      this.router.navigate(['/dashboard']);
    }
    return isValid;
  }
  
  logout(): void {
    this.isAuthenticated = false;
    this.router.navigate(['/auth']);
  }
  
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}