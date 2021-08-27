import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { RubrosartService } from 'src/app/servicios/rubrosart.service';
import { ToastService } from "src/app/servicios/toast.service";

import { RubroArt } from 'src/app/models/RubroArt';


@Component({
  selector: 'app-modalrubroart',
  templateUrl: './modalrubroart.component.html',
  styleUrls: ['./modalrubroart.component.scss']
})
export class ModalrubroartComponent implements OnInit {
  @Output()
  actualizar = new EventEmitter<string>()
  @ViewChild('btnClose') btnClose: ElementRef;
  public rubros :RubroArt[] = [];
  public esRubro: boolean= false;

  constructor(public servicio: RubrosartService, private toast: ToastService) { }

  ngOnInit(): void {
    this.servicio.getAll().subscribe(
      data => this.rubros = data,
      error => console.error(error)
    );
  }

  getData() {
    let rubro = this.servicio.selectedRubro.RubArtPadre;
    
    if(rubro) {
      return rubro._id
    } 
    return null;
  }
  //Controlar el cambio de estado del checkbox
  checkValue(event: any){
    this.esRubro = event.target.checked;
  }

  //guardamos
  onSaveRubro(rubroForm : NgForm){
    //nuevo rubro
    let { _id, denominacion, RubArtPadre } = rubroForm.value;
    // let RubArtPadre = this.getData();
    // console.log(rubroForm.value.RubArtPadre);
    
    if(rubroForm.value.id == null){
      this.servicio.post({ _id, denominacion, RubArtPadre}).subscribe(()=>{
        this.toast.display("Rubro creado","success", 'OK');
      });
    }
    //editar rubro
    else{
      this.servicio.put(rubroForm.value.id,{ _id, denominacion, RubArtPadre}).subscribe(() =>{
        this.toast.display("Rubro acctualizado","success", 'OK');
      });
    }
    rubroForm.resetForm();
    this.resetForm();
    this.onActualizar();
    this.btnClose.nativeElement.click();
  }
  //resetear formulario
  resetForm(){
    this.servicio.selectedRubro = {
      _id:null,
      denominacion:'',
      RubArtPadre: ''
    }
  }
  //funcion para avisar al componente padre que se ha actualizado o añadido un registro
  onActualizar(){
    this.actualizar.emit("actualizando")
  }

  cerrar(e: Event): void {
    e.preventDefault();
    this.resetForm();
    this.onActualizar();
    this.btnClose.nativeElement.click();
    e.stopPropagation();
  }
}
