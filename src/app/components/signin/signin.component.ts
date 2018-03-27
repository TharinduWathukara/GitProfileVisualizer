import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/AuthenticationService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  private logemail:string;
  private logpassword:string;

  // for errors
  private err:string;

  constructor(private authservice:AuthenticationService,private router:Router) { }

  ngOnInit() { }

  signIn(){
    this.authservice.signIn(this.logemail,this.logpassword).subscribe( data=>{
        this.authservice.setSignIn(data.username);
        this.router.navigate(['profile']);
      },
      err =>{
        this.err=err;
      }
    )

  }

}
