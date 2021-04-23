import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm():void{
    this.registerForm = this.fb.group({
      nombre:['',[Validators.required]],
      email:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password:['',[Validators.required,Validators.minLength(8)]],
      confirm:['',[Validators.required,Validators.minLength(8)]]
    })

  }

  onRegister(){
    if(this.registerForm.valid){
      console.log(this.registerForm.value)
    }
    else{
      console.log("not valid")
    }
  }

  isValidField(campo:string):string{
    const validatedField = this.registerForm.get(campo);
    return (!validatedField.valid && validatedField.touched)?'is-invalid':validatedField.touched?'is-valid':'';
  }
  
  confirmPass(){
    return this.registerForm.get('password')== this.registerForm.get('confirm');
  }
 

}
