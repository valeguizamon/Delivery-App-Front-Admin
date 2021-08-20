import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../servicios/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isLogged:boolean = false;
  public dynRoute: string; //Dynamic route param


  constructor(private authService : AuthService) { }


  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.authService.isAuth().subscribe(auth =>{
      if(auth){
        this.isLogged= true;
        this.dynRoute = "panel"
      } else {
        this.dynRoute = "home";
        this.isLogged = false;
      }
    })
  }

  logOut(){
    this.authService.logOut();
  }
}