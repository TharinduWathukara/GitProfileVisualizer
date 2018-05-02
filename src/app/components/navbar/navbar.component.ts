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
    if(this.authService.isAuthenticate()){
      this.isSignIn = true;
      this.gitUsername = this.authService.getUsername();
      this.getProfilePic();
    }
    else{
      this.authService.getProfile().subscribe(data1 =>{
        if(data1.username){
          this.authService.setSignIn(data1.username);
          this.isSignIn = this.authService.isAuthenticate();
          this.gitUsername = this.authService.getUsername();
          this.getProfilePic();
        }
      });
    }
  }

  getProfilePic(){
    this.profileService.getGitHubuserProfileInfo(this.gitUsername).subscribe(data2=>{
      this.name = data2.name;
      this.avatarUrl = data2.avatar_url;
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
