import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/User';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  displayedColumns: string [] = ['#','Username','Email','Telefono','Domicilio', 'Acciones'];
  pageSizeOptions = [2,4,6];
  dataSource = new MatTableDataSource<User>();
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  public users = []
  public textSearch="";
  public filtroSelected= "username";
  public totalCount = 0;
  public pageCount = 5;
  public currentPage = 0;

  public userProp = {}; //Solo para pasar info al modal


  constructor(private userService: UsuariosService) { }
  
  ngOnInit(): void {
    this.getUsers()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  getUsers(){
    this.userService.getAllUsers().subscribe((users)=>{
      this.users= users
      this.dataSource.data = this.users
    })
  }

  onPageChange(event: PageEvent){
    this.currentPage = event.pageIndex
    this.pageCount = event.pageSize
    this.totalCount = event.length
  }

  search(value) {
    if(value.length>=3) {
      this.dataSource.data = this.userService.getFiltered(this.users,value)
    } else {
      this.dataSource.data = this.users
    }
  }

  editUser(e:Event, user: any): void{
    e.preventDefault();
    this.userProp = user;
    // e.stopPropagation();
  }
}