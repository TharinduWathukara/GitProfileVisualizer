import { Injectable , OnInit} from '@angular/core';
import { Http , Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService implements OnInit {
  private isSignIn:boolean;
  private gitUsername:string;

  constructor(private http:Http) { }

  ngOnInit(){
    this.isSignIn=false;
  }

  signUp(fullname:string,gitusername:string,email:string,password:string,passwordConf:string){

    let user={
      "fullname":fullname,
      "email":email,
      "gitusername":gitusername,
      "password":password,
      "passwordConf":passwordConf
    }

    return this.http.post('/signUp', user,{withCredentials: true}).map(res=>res.json());
  }


  signIn(email:string, password:string){

    let user = {
      "logemail":email,
      "logpassword":password
    }
    return this.http.post('/signIn', user,{withCredentials: true}).map(res => res.json());
  }

  signOut(){
    return this.http.get('/signOut',{withCredentials: true}).map(res => res.json());
  }

  getProfile(){
    return this.http.get('/profile',{withCredentials: true}).map(res => res.json()); 
  }

  setSignIn(username){
    this.isSignIn=true;
    this.gitUsername=username;
  }

  setSignOut(){
    this.isSignIn=false;
    this.gitUsername=null;
  }

  isAuthenticate(){
    return this.isSignIn;
  }

  getUsername(){
    return this.gitUsername;
  }

}
