import { Component, OnInit, OnChanges} from '@angular/core';
import { ProfileService } from '../../services/ProfileService';
import { AuthenticationService } from '../../services/AuthenticationService';
// import { Chart } from 'chart.js';
import * as Chart from 'chart.js';
import { RepoPipe } from '../../pipes/repo.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnChanges{

  private repository_name:string;
  private gitUsername:string;
  private profile:any[];
  private repos:any[];
  private reposDetails:any[];
  private popularLanguages:any[];

  // charts
  private chart1:any;     //for popular languages
  private chart2:any;     //for size of repositories
  private chart3:any;     //for popular repos by stars
  private chart4:any;     //for popular repos by watching

  constructor(private profileservice : ProfileService, private authService:AuthenticationService, private router:Router) { }

  ngOnInit() {
    if(this.authService.isAuthenticate()){
      this.getProfileDetails();
    }
    else{
      this.authService.getProfile().subscribe(data =>{
        if(data.username){
          this.authService.setSignIn(data.username);
          this.getProfileDetails();
        }else{
          this.router.navigate(['signIn']);
        }
      },err =>{
        this.router.navigate(['signIn']);
      });
    }
  }

  ngOnChanges(){
    
  }


  getProfileDetails(){
    this.gitUsername = this.authService.getUsername();
    // this.gitUsername = "TharinduWathukara";
    this.getProfile();
    this.getRepos();
    this.getReposDetails();
    this.getPopularLanguages();
  }

  getProfile(){
    this.profileservice.getGitHubuserProfileInfo(this.gitUsername).subscribe(profile => {
      this.profile=profile;
      console.log(profile);
    });
  }

  getRepos(){
    this.profileservice.getGitRepositories(this.gitUsername).subscribe(repos=>{
      this.repos=repos;
      console.log(repos);
    });
  }

  getReposDetails(){
    this.profileservice.getReposDetails(this.gitUsername).subscribe(reposDetails=>{
      this.reposDetails=reposDetails;
      console.log(reposDetails);

      setTimeout(()=>{
        // Size of repositories
        let ctx2 = document.getElementById('canvas2');
        this.chart2 = new Chart(ctx2,{
          type: 'horizontalBar',
          data: {
            datasets:[{
              data:reposDetails.sizeOfRepo,
              backgroundColor:'plum',
              label: 'Size'
            }],
            labels:reposDetails.repoSize
          },
          options: {
            responsive: true,
            legend: {
              position: 'right',
            },
            title: {
              display: true,
              text: 'Size of Repos(kb)'
            }
          }
        });

        // Popularity by stars
        let ctx3 = document.getElementById('canvas3');
        this.chart3 = new Chart(ctx3,{
          type: 'doughnut',
          data:{
            datasets:[{
              data:reposDetails.popularByStars,
              backgroundColor: [
                'red',
                'orange',
                'royalblue',
                'green',
                'aqua',
                'yellow',
                'plum',
                'pink',
                'burlywood',
                'peru',
                'silver'
              ],
              label: 'Popular Languages'
            }],
            labels:reposDetails.repoStars
          },
          options: {
            responsive: true,
            legend: {
              position: 'bottom',
              display:false,
              labels:{
                usePointStyle:true,
                padding:5,
                fontSize:12,
              }
            },
            title: {
              display: true,
              text: 'Popular Repositories by Stars'
            },
            animation: {
              animateScale: true,
              animateRotate: true
            }
          }
        });

        // Popularity by watching
        let ctx4 = document.getElementById('canvas4');
        this.chart4= new Chart(ctx4,{
          type: 'doughnut',
          data:{
            datasets:[{
              data:reposDetails.popularByWatching,
              backgroundColor: [
                'red',
                'orange',
                'royalblue',
                'green',
                'aqua',
                'yellow',
                'plum',
                'pink',
                'burlywood',
                'peru',
                'silver'
              ],
              label: 'Popular Languages'
            }],
            labels:reposDetails.repoWatching
          },
          options: {
            responsive: true,
            legend: {
              position: 'bottom',
              display:false,
              labels:{
                usePointStyle:true,
                padding:5,
                fontSize:12,
              }
            },
            title: {
              display: true,
              text: 'Popular Repositories by Watching'
            },
            animation: {
              animateScale: true,
              animateRotate: true
            }
          }
        });

      });
    });
  }

  getPopularLanguages(){
    this.profileservice.getPopularLanguages(this.gitUsername).subscribe(popularLanguages=>{
      this.popularLanguages=popularLanguages;
      console.log(popularLanguages);

      setTimeout(()=>{
        // popular laguages
        let ctx1 = document.getElementById('canvas1');
        this.chart1 = new Chart(ctx1,{
          type: 'doughnut',
          data: {
            datasets:[{
              data:popularLanguages.count,
              backgroundColor: [
                'red',
						    'orange',
                'royalblue',
                'green',
						    'aqua',
                'yellow',
                'plum',
                'pink',
                'burlywood',
                'peru',
                'silver'
              ],
              label: 'Popular Languages'
            }],
            labels:popularLanguages.languages
          },
          options: {
            responsive: true,
            legend: {
              display:false,           
              position: 'bottom',
              labels:{
                usePointStyle:true,
                padding:5,
                fontSize:12,
              }
            },
            title: {
              display: true,
              text: 'Popular Languages'
            },
            animation: {
              animateScale: true,
              animateRotate: true
            }
          }
        });
      });
    });
  }


}
