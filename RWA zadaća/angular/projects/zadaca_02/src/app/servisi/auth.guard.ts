import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isUser = route.data["user"];
    const isAdmin = route.data['admin'];
    console.log("isuser", route.data);
  
    if (isUser) {
      const userRole = sessionStorage.getItem('korime');
  
      if (userRole !== '') {
        return true;
      } else {
        this.router.navigate(['/prijava']);
        return false;
      }
    } else if (isAdmin) {
      const userRole = sessionStorage.getItem('korime');
  
      if (userRole === 'admin') {
        return true;
      } else {
        this.router.navigate(['/prijava']);
        return false;
      }
    }
  
    return false;
  }
}
