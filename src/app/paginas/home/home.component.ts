import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from "../../servicios/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loginForm: FormGroup;
  public email:string = "";
  public password: string = "";
  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void{
    this.loginForm = this.fb.group({
      email: [[''],[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password:[[''],[Validators.required,Validators.minLength(8)]]
    })
  }

  onLogin(): void{
    this.authService.loginEmailUser(this.email,this.password);
  }

  isValidField(campo:string): string{
    const validatedField = this.loginForm.get(campo);
    return (!validatedField.valid && validatedField.touched)?'is-invalid':validatedField.touched?'is-valid':'';
  }
}
