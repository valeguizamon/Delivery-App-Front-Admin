import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RubrosartService } from 'src/app/servicios/rubrosart.service';

@Component({
  selector: 'app-modalrubroart',
  templateUrl: './modalrubroart.component.html',
  styleUrls: ['./modalrubroart.component.scss']
})
export class ModalrubroartComponent implements OnInit {
  @Output()
  actualizar = new EventEmitter<string>()
  @ViewChild('btnClose') btnClose: ElementRef;
  constructor(public servicio: RubrosartService) { }

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
