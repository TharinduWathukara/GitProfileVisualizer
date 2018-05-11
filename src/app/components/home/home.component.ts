import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/ProfileService';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private profile:any[];
  private gitUserName:string;
  private reposDetails:any[];
  private popularLanguages:any[];
  private repoCommits:any[];

  // for charts
  private chart1:any;     //for popular languages
  private chart2:any;     //for commits per repo
  private chart3:any;     //for popular repos by stars
  private chart4:any;     //for popular repos by watching

  constructor(private profileservice : ProfileService) { }

  ngOnInit() {
  }

  findProfile(event){
    if (event.key === "Enter") {
      this.getProfile();
      this.getReposDetails();
      this.getPopularLanguages();
      this.getRepoCommits();
    }
  }

  getProfile(){
    this.profileservice.getGitHubuserProfileInfo(this.gitUserName).subscribe(profile => {
      this.profile = profile;
      // console.log(profile);
    });
  }

  getReposDetails(){
    this.profileservice.getReposDetails(this.gitUserName).subscribe(reposDetails=>{
      this.reposDetails=reposDetails;
      // console.log(reposDetails);

      setTimeout(()=>{
        // Popularity by stars
        let ctx3 = document.getElementById('canvas3');
        this.chart3 = new Chart(ctx3,{
          type: 'doughnut',
          radius: "50%",
          indexLabelPlacement: "outside",
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
              position: 'left',
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
              position: 'left',
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
    this.profileservice.getPopularLanguages(this.gitUserName).subscribe(popularLanguages=>{
      this.popularLanguages=popularLanguages;
      // console.log(popularLanguages);

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
              position: 'left',
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

  getRepoCommits(){
    this.profileservice.getRepoCommits(this.gitUserName).subscribe(repoCommits=>{
      this.repoCommits=repoCommits;
      // console.log(popularLanguages);

      setTimeout(()=>{
        // popular laguages
        let ctx2 = document.getElementById('canvas2');
        this.chart2 = new Chart(ctx2,{
          type: 'doughnut',
          data: {
            datasets:[{
              data:repoCommits.commits,
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
              label: 'Repos'
            }],
            labels:repoCommits.repositories
          },
          options: {
            responsive: true,
            legend: {
              display:false,           
              position: 'left',
              labels:{
                usePointStyle:true,
                padding:5,
                fontSize:12,
              }
            },
            title: {
              display: true,
              text: 'Commits per Repo'
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
