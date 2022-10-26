import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { CustomValidator } from 'src/app/validators/custom.validator';
import { DataService } from 'src/app/services/data.service';
import { Security } from 'src/app/utils/security.util';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {
  public form: FormGroup;
  public busy = false;

  constructor(
    private router: Router,    
    private service: DataService,    
    private fb: FormBuilder,
    private toastr: ToastrService    
  ) { 
    this.form = this.fb.group({
      username: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(100),
        Validators.required,
        CustomValidator.EmailValidator       
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]
    });
  }

  ngOnInit() {
  }

  submit() {
    this.busy = true;    
    this
    .service
    .authenticate(this.form.value)
    .subscribe(
      (data : any) => {
        this.busy = false;            
        this.setUser(data);
    },
    (err)  => {
      console.log(err);
      this.busy = false;    
      this.toastr.error("Senha Inválida. Após 10 tentativas erradas a senha é bloqueada. Se não lembra da senha, utilize o botão Esqueci minha senha", 'Login');        
    }   
    );
  }

  setUser(user : User) {
    Security.setUser(user);
    if (user.changePassword)
     this.router.navigate(['/account/changepassword']);
    else
     this.router.navigate(['/designacao']);
  }

}
