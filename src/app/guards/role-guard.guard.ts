import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../servicios/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuardGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}

 async canActivate(
    route: ActivatedRouteSnapshot
  ): Promise<boolean> {
    const roles = route.data.role;
    let user = await this.auth.getUser();
    if(!user?.role) {
      alert('Esta cuenta no tiene los permisos para acceder a este panel de administracion.')
      this.auth.logOut()
      this.router.navigate(['/home'])
      window.location.reload()
      return false
    }
    let permission = roles.includes(user.role)
    if(permission) {
      return true;
    } else {
      this.router.navigate(['/panel'])
      return false
    }
  }
}
