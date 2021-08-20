import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

import { ConfigService } from 'src/app/servicios/config.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { ToastService } from "src/app/servicios/toast.service";

import { Config } from 'src/app/models/config';
import { ROLES } from 'src/app/models/roles';


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
  public registerForm: FormGroup;
  public configForm: FormGroup;
  public rolesArray = Object.values(ROLES);
  private configID: string;

  // private userFID: string;


  constructor( 
    private formBuilder: FormBuilder, private configSvc: ConfigService, 
    private authSvc: AuthService, private toast: ToastService
  ) { 
    this.buildFormConfig();
    this.buildRegisterForm();
  }

  ngOnInit( ): void { 
    this.configSvc.getConfigData().subscribe( data => this.buildFormConfig(data) );
  }


  private buildFormConfig(configEmpresa: Config = null) {
    if(configEmpresa) {
      this.configID = configEmpresa._id;
      this.configForm.setValue({
        emailEmpresa: configEmpresa.emailEmpresa,
        lat: configEmpresa.lat,
        lng: configEmpresa.lng,
        tokenMercadoPago: configEmpresa.tokenMercadoPago
      });
    } else {
      this.configForm = this.formBuilder.group({
        emailEmpresa: [ "",[] ],
        lat: [ 0, [] ],
        lng: [ 0, [] ],
        tokenMercadoPago: [ "", [] ],
      });
    }
  }

  private buildRegisterForm(): void {
    this.registerForm = this.formBuilder.group({
      nombre:['',[ Validators.required ]],
      email:['',[ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") ]],
      password:['',[ Validators.required, Validators.minLength(8) ]],
      rol: ['cliente',[ Validators.required]]
    });
  }

  public isValidField(campo:string):string{
    const validatedField = this.registerForm.get(campo);
    return (!validatedField.valid && validatedField.touched)?'is-invalid':validatedField.touched?'is-valid':'';
  }

  public onSaveConfig(e: Event): void {
    e.preventDefault();
    this.configSvc.saveConfigData(this.configForm.value, this.configID).subscribe( resp => {
      this.toast.display("Configuraciones actualizadas", "success", "Listo");
    }, error => { 
      console.log("Error : ", error); 
      this.toast.display("Error al actualizar configuraciones","error");
    });
  }

  public onRegisterUser(e: Event): void {
    e.preventDefault();
    let { email, password, rol, nombre } = this.registerForm.value;
    
    this.authSvc.registerEmployee(email, password, rol, nombre).subscribe( 
      resp => {
        this.toast.display(`Registrado con uid : ${resp.uid}`, "success", "Listo");
      }, error => { 
        console.log("Error : ", error); 
        this.toast.display("Error al registrar un nuevo usuario","error");
      });
    this.registerForm.reset();
  }
}