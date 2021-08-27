import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { AuthService } from "../../servicios/auth.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isLogged: boolean = false;
  public dynRoute: string = "home"; //Dynamic route param
  public email: string = "";
  private authSuscription: Subscription;

  constructor(private authService : AuthService, private router: Router) { }


  ngOnInit(): void {
    this.getAuth();
  }

  private getAuth(): void {
    this.authService.isAuth().subscribe(
      auth => {
        if(auth) {
          this.dynRoute = "panel";
          this.isLogged = true;
          this.email = auth.email;
        } else {
          this.dynRoute = "home";
          this.isLogged = false;
        }
      },
      error => console.error(error)
    );
  }

  public logOut(e: Event){
    e.preventDefault();
    this.authService.logOut();
    this.getAuth();
    this.router.navigate(['/home']);
  }
}