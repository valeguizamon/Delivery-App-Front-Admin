import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InsumoService } from 'src/app/servicios/insumos.service';
import { NgForm} from '@angular/forms'
import { Insumo } from 'src/app/models/Insumo';
@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.scss']
})
export class InsumosComponent implements OnInit {

  @ViewChild ('btnClose') btnClose: ElementRef

  public insumos = []

  constructor(public servicio : InsumoService) { }

  ngOnInit(): void {
    this.getAll()
  }

  //cargar todos los articulos
  getAll(){
    this.servicio.getAll().subscribe((data) =>{
      this.insumos = data
    })
  }

  //precargamos el articulo a editar en el formulario
  preUpdateInsumo(insumo: Insumo){
    this.servicio.selected = insumo
  }


  //guardar articulo editar/crear
  onSave(formInsumo: NgForm){
    //nuevo articulo
    if(formInsumo.value.id === null){
      this.servicio.post(formInsumo.value).subscribe(
        ()=>{
          alert("Artículo guardado exitosamente")
        },
        err => console.log(err)
      )
    }
    //editar articulo
    else{
      this.servicio.put(formInsumo.value.id, formInsumo.value).subscribe(
        ()=> alert("Editado correctamente"),
        err => console.log(err)
      )
    }
    formInsumo.resetForm()
    this.servicio.setNull()
    this.btnClose.nativeElement.click()
    this.getAll()
  }

  
  //eliminar articulo
  onDelete(id: string){
    const confirmacion=confirm("¿Está seguro que desea eliminar este artículo?")
    if(confirmacion){
      this.servicio.delete(id).subscribe(
        ()=>alert("Artículo eliminado correctamente")
      )
    }
    this.servicio.setNull()
    this.getAll()
  }

  //reiniciar formulario 
  resetForm(){
    this.servicio.setNull()
  }


}
