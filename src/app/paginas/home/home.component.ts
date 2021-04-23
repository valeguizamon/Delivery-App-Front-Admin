import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }
  private initForm():void{
    this.loginForm = this.fb.group({
      email: [[''],[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password:[[''],[Validators.required,Validators.minLength(8)]]
    })
  }
  onLogin():void{
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
    }else{
      console.log("not valid")
    }
  }
  isValidField(campo:string):string{
    const validatedField = this.loginForm.get(campo);
    return (!validatedField.valid && validatedField.touched)?'is-invalid':validatedField.touched?'is-valid':'';
  }
}
