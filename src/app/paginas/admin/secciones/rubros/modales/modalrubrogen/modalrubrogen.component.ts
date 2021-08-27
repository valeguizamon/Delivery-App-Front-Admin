import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";

import { RubroService } from "src/app/servicios/rubros.service";
import { ToastService } from "src/app/servicios/toast.service";


@Component({
  selector: 'app-modalrubrogen',
  templateUrl: './modalrubrogen.component.html',
  styleUrls: ['./modalrubrogen.component.scss']
})
export class ModalrubrogenComponent implements OnInit {
  @Output()
  actualizar = new EventEmitter<string>()
  @ViewChild('btnClose') btnClose: ElementRef;
  
  constructor(public servicio: RubroService, private toast: ToastService) { }

  ngOnInit(): void {
  }

  //guardamos
  onSaveRubro(rubroForm : NgForm){
    //nuevo rubro
    if(rubroForm.value.id == null){
      this.servicio.post(rubroForm.value).subscribe(()=>{
        this.toast.display("Rubro creado","success", 'OK');
      })
      
    }
    //editar rubro
    else{
      this.servicio.put(rubroForm.value.id,rubroForm.value).subscribe(() =>{
        this.toast.display("Rubro actualizado","success", 'OK');
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
