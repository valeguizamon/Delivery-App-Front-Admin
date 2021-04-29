import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RubroService} from "../../../servicios/rubros.service";
import { NgForm} from "@angular/forms"
@Component({
  selector: 'app-modalrubrogen',
  templateUrl: './modalrubrogen.component.html',
  styleUrls: ['./modalrubrogen.component.scss']
})
export class ModalrubrogenComponent implements OnInit {
  
  @ViewChild('btnClose') btnClose: ElementRef;
  
  constructor(public servicio: RubroService) { }

  ngOnInit(): void {
  }

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
    this.btnClose.nativeElement.click();
  }
  resetForm(){
    this.servicio.selectedRubro = {
      _id:null,
      denominacion:''
    }
  }
}
