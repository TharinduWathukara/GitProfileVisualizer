import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/AuthenticationService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private sfullname:string;
  private semail:string;
  private sgitusername:string;
  private spassword:string;
  private spasswordConf:string;


  // for errors
  private err:string;

  constructor(private authservice:AuthenticationService,private router:Router) { }

  ngOnInit() {
  }

  signUp(){
    this.authservice.signUp(this.sfullname,this.sgitusername,this.semail,this.spassword,this.spasswordConf).subscribe(data=>{
        this.authservice.setSignIn(data.username);
        this.router.navigate(['profile']);
      },
      err =>{
        this.err=err;
      }
    )
  }
}
