import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { RubroService} from "src/app/servicios/rubros.service";
import { NgForm} from "@angular/forms"
@Component({
  selector: 'app-modalrubrogen',
  templateUrl: './modalrubrogen.component.html',
  styleUrls: ['./modalrubrogen.component.scss']
})
export class ModalrubrogenComponent implements OnInit {
  @Output()
  actualizar = new EventEmitter<string>()
  @ViewChild('btnClose') btnClose: ElementRef;
  
  constructor(public servicio: RubroService) { }

  ngOnInit(): void {
  }

  //guardamos
  onSaveRubro(rubroForm : NgForm){
    //nuevo rubro
    if(rubroForm.value.id == null){
      this.servicio.post(rubroForm.value).subscribe(()=>{
        alert("Rubro guardado exitosamente");
      })
      
    }
    //editar rubro
    else{
      this.servicio.put(rubroForm.value.id,rubroForm.value).subscribe(() =>{
        alert("Editado correctamente")
      });
    }
    rubroForm.resetForm();
    this.servicio.selectedRubro= {
      _id:null,
      denominacion: ""
    };
    this.onActualizar();
    this.btnClose.nativeElement.click();
  }
  //resetear formulario
  resetForm(){
    this.servicio.selectedRubro = {
      _id:null,
      denominacion:''
    }
  }
  //funcion para avisar al componente padre que se ha actualizado o añadido un registro
  onActualizar(){
    this.actualizar.emit("actualizando")
  }
}
