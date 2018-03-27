import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/ProfileService';
import { AuthenticationService } from '../../services/AuthenticationService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private isSignIn:boolean;
  private gitUsername:string;
  private name:string;
  private avatarUrl:string;

  constructor(private authService:AuthenticationService, private profileService:ProfileService, private router:Router) { }

  ngOnInit() {
    this.isSignIn = this.authService.isAuthenticate();
    this.gitUsername = this.authService.getUsername();
    
    this.profileService.getGitHubuserProfileInfo(this.gitUsername).subscribe(data=>{
      this.name = data.name;
      this.avatarUrl = data.avatar_url;
      console.log(this.avatarUrl);
    });
  }


  signOut(){
    this.authService.signOut().subscribe(data =>{
      this.authService.setSignOut();
      this.router.navigate(['home']);
    });
  }

}
