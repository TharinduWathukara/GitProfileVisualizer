import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes , RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';

import { ProfileService } from './services/ProfileService';
import { AuthenticationService } from './services/AuthenticationService';
import { AuthGuard } from './services/AuthGuard';
import { RepoComponent } from './components/repo/repo.component';


const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'signIn',
    component:SigninComponent
  },{
    path:'signUp',
    component:SignupComponent
  },
  {
    path:'profile',
    component:ProfileComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'repos/:name',
    component:RepoComponent,
    // canActivate:[AuthGuard]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    ProfileComponent,
    RepoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
    
  ],
  providers: [
    ProfileService,
    AuthenticationService,
    AuthGuard
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
