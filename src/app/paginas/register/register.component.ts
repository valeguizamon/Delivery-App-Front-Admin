import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService} from "../../servicios/auth.service";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  public email: string = "";
  public password: string = "";
  constructor(private fb:FormBuilder,private authService: AuthService) { }

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
    this.authService.registerUser(this.email,this.password)
    .then((res)=>{
      alert('usuario registrado')
    }).catch(err => console.log("err",err.message));
  }

  isValidField(campo:string):string{
    const validatedField = this.registerForm.get(campo);
    return (!validatedField.valid && validatedField.touched)?'is-invalid':validatedField.touched?'is-valid':'';
  }
  
  confirmPass(){
    return this.registerForm.get('password')== this.registerForm.get('confirm');
  }
 

}
