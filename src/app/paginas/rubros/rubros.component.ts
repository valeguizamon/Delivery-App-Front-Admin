import { Component, OnInit } from '@angular/core';
import { RubroGral } from 'src/app/models/RubroGral';
import { RubroService} from "../../servicios/rubros.service";
@Component({
  selector: 'app-rubros',
  templateUrl: './rubros.component.html',
  styleUrls: ['./rubros.component.scss']
})
export class RubrosComponent implements OnInit {
  public rubroSeleccionado: RubroGral ={
    _id: null,
    denominacion: ""
  }
  rubros: RubroGral[] = [];
  constructor(private servicio: RubroService) { }

  ngOnInit(): void {
    this.getAll();
  }

  //traer los rubros
  getAll(){
    console.log("getting all")
    this.servicio.getAll().subscribe((data) =>this.rubros = data);
  }
  //cargamos el rubro a editar en el modal
  preUpdateRubro(rubro: RubroGral){
    console.log("Listo para editar",rubro)
    this.servicio.selectedRubro = Object.assign({},rubro);
  }
  onDelete(id: string){
    console.log(id)
    const confirmacion = confirm('¿Está seguro de que desea eliminar este rubro?');
    if(confirmacion){
      this.servicio.delete(id).subscribe(()=>{
        alert("Eliminado correctamente")
      });
    }
    this.getAll();
  }
}
