import { Component, OnInit } from '@angular/core';
import { AuthService} from "../../servicios/auth.service"
import { Router} from "@angular/router"
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isLogged:boolean = false;
  constructor(private authService : AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.authService.isAuth().subscribe(auth =>{
      if(auth){
        this.isLogged= true;
        console.log("user logged")
      }else{
        console.log("user not logged")
      }
    })
  }

  logOut(){
    this.authService.logOut()
    this.router.navigate[('/')]

  }


}
