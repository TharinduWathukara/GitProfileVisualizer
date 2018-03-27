import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/ProfileService';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/AuthenticationService';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.css']
})
export class RepoComponent implements OnInit {
  private repo:any[];
  private languages:any[];
  private username:string;

  constructor(private profileService:ProfileService,private route:ActivatedRoute, private authService:AuthenticationService) { }

  ngOnInit() {
    // this.username = this.authService.getUsername();
    this.username="TharinduWathukara";
    this.getRepo(this.username,this.route.snapshot.params['name']);
    this.getLanguages(this.username,this.route.snapshot.params['name']);
  }

  getRepo(username:string,name:string){
    this.profileService.getRepo(username,name).subscribe(repo=>{
      this.repo=repo;
      console.log(repo);
    });
  }

  getLanguages(username:string,name:string){
    this.profileService.getRepoLanguages(username,name).subscribe(data=>{
      this.languages=data.languages;
      console.log(data);
    })
  }
}
