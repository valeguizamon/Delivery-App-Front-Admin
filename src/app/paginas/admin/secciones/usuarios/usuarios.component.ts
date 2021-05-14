import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  constructor(private userService: UsuariosService) { }

  public users: User[];
  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(){
    this.userService.getAllUsers().subscribe(users => this.users = users)
  }

}