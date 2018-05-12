import { Injectable } from '@angular/core';
import { Http , Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProfileService {


  constructor(private http: Http){
  }

  getGitHubuserProfileInfo(username: string){
    return this.http.get('/getgithubuser/'.concat(username)).map(res => res.json());
  }

  getGitRepositories(username:string){
    return this.http.get('/getrepositories/'.concat(username)).map(res=>res.json());
  }

  // getUsername(){
  //   return this.http.get('http://localhost:3000/profile/',{withCredentials: true}).map(res=>res.json());
  // }

  getReposDetails(username:string){
    return this.http.get('/getReposDetails/'.concat(username)).map(res=>res.json());
  }

  getRepoCommits(username:string){
    return this.http.get('/getRepoCommits/'.concat(username)).map(res=>res.json());
  }

  getPopularLanguages(username:string){
    return this.http.get('/getPopularLanguages/'.concat(username)).map(res=>res.json());
  }

  getRepo(username:string,name:string){
    let data={
      "username":username,
      "name":name
    }
    return this.http.post('/getRepo',data,{withCredentials: true}).map(res=>res.json());
  }
  
  getRepoLanguages(username:string,name:string){
    let data={
      "username":username,
      "name":name
    }
    return this.http.post('/getRepoLanguages',data,{withCredentials: true}).map(res=>res.json());
  }

  getRepoStatistics(username:string,name:string){
    let data = {
      "username":username,
      "name":name
    }
    return this.http.post('/getRepoStats',data,{withCredentials:true}).map(res=>res.json());
  }

  getCodeQuality(username:string,name:string){
    let data = {
      "username":username,
      "name":name
    }
    return this.http.post('/getCodeQuality',data,{withCredentials:true}).map(res=>res.json());
  }

}
