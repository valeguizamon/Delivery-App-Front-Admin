import { Component, OnInit } from '@angular/core';
import { RubroGral } from 'src/app/models/RubroGral';
import { RubroArt} from 'src/app/models/RubroArt';
import { RubroService} from "../../../../servicios/rubros.service";
import { RubrosartService } from 'src/app/servicios/rubrosart.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-rubros',
  templateUrl: './rubros.component.html',
  styleUrls: ['./rubros.component.scss']
})
export class RubrosComponent implements OnInit {
 
  generales: RubroGral[] = [];
  articulos: RubroArt[] = [];
  constructor(private servicioG: RubroService, private servicioA: RubrosartService) { }

  ngOnInit(): void {
    this.getAll();
  }

  //traer los rubros
  getAll(){
    console.log("getting all")
    this.servicioG.getAll().subscribe((data) =>this.generales = data);
    this.servicioA.getAll().subscribe((data) => this.articulos = data);
  }
  //cargamos el rubro a editar en el modal
  preUpdateRubro(rubro,tipo){
    if(tipo === "general"){
      console.log("Listo para editar",rubro)
      this.servicioG.selectedRubro = Object.assign({},rubro);
    }
    else if(tipo =="articulo"){
      console.log("Listo para editar",rubro)
      this.servicioA.selectedRubro = Object.assign({},rubro);
    }
    
    
  }
  //eliminar rubro
  onDelete(id: string,tipo){
    console.log(id)
    const confirmacion = confirm('¿Está seguro de que desea eliminar este rubro?');
    if(confirmacion){
      if(tipo === 'general'){
        this.servicioG.delete(id).subscribe(()=>{
          alert("Eliminado correctamente")
        });
      }
      else{
        this.servicioA.delete(id).subscribe(()=>{
          alert('Eliminado correctamente')
        })
      }
      
      this.getAll();
    }
    
  }

  //actualizar tabla desde el save() del modal
  onActualizar(mensaje){
    console.log(mensaje)
    this.getAll();
  }
}

