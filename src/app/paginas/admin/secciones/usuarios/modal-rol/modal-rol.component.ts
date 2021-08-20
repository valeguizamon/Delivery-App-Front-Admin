import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UsuariosService } from 'src/app/servicios/usuarios.service';

import { ROLES } from "src/app/models/roles";


@Component({
  selector: 'app-modal-rol',
  templateUrl: './modal-rol.component.html',
  styleUrls: ['./modal-rol.component.scss']
})
export class ModalRolComponent implements OnInit {
  @Input() userData: any = {};
  @ViewChild('btnClose') btnClose: ElementRef;

  public rolForm: FormGroup;
  public rolesArray = Object.values(ROLES);


  constructor(private formBuilder: FormBuilder, private UserSvc: UsuariosService) { }


  ngOnInit(): void { }

  ngOnChanges(): void {
    this.buildRolForm(this.userData.role);
  }


  private buildRolForm(rol: string): void {
    if(rol) {
      this.rolForm.patchValue({rol});
    } else {
      this.rolForm = this.formBuilder.group({
        rol: ["cliente", []]
      });
    }
  }

  public onSaveRol(e: Event): void {
    e.preventDefault();
    this.UserSvc.changeUserRol(this.rolForm.value.rol, this.userData.uid);
    this.btnClose.nativeElement.click();
  }
}