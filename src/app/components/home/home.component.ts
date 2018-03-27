import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/ProfileService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private profile:any[];
  private gitUserName:string;

  constructor(private profileservice : ProfileService) { }

  ngOnInit() {
  }

  findProfile(){
    this.profileservice.getGitHubuserProfileInfo(this.gitUserName).subscribe(profile => {
      this.profile = profile;
      console.log(profile);
    });
  }

}
