import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './AuthenticationService';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthenticationService,private router:Router){ }

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //     if (!this.authService.isAuthenticate()) {
  //       this.authService.getProfile().subscribe( data=>{
  //         this.authService.setSignIn(data.username);
  //       });
  //       if(!this.authService.isAuthenticate()){
  //         this.router.navigate(['signIn']);
  //         return false;
  //       }
  //       return true;
  //     }
  //     return true;
  // } 
  canActivate(){
    if(!this.authService.isAuthenticate()){
      this.router.navigate(['signIn']);
      return false;
    }
    return true;
  }
  //   {
  //   // if (!this.authService.isAuthenticate()) {
  //   //   this.authService.getProfile().subscribe( data=>{
  //   //     this.authService.setSignIn(data.username);
  //   //   });
  //   //   if(!this.authService.isAuthenticate()){
  //   //     this.router.navigate(['signIn']);
  //   //     return false;
  //   //   }
  //   //   return true;
  //   // }
  //   // return true;
  //   return this.authService.checkAuthenticationAtAuth();
  // }
}
