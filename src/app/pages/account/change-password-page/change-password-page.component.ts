import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomValidator } from 'src/app/validators/custom.validator';
import { IrmaoDataService } from 'src/app/services/irmao.data.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-change-password-page',
  templateUrl: './change-password-page.component.html'
})
export class ChangePasswordPageComponent implements OnInit {
  public form: FormGroup;
  public busy = false;
  public errors: any[] = [];    

  constructor(
    private router: Router,    
    private serviceIrmao: IrmaoDataService,    
    private serviceBase: ErrorService,             
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.compose([
      ])],
      senha: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]
      ,
      novaSenha: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])],
      confirmacaoNovaSenha: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]      
    });
  }

  submit() {
    this.busy = true;    
    this
    .serviceIrmao
    .changePassword(this.form.value)
    .subscribe(
      (data: any) => {
        this.busy = false;
        this.router.navigate(['/designacao']);        
      },
      fail =>{
        this.serviceBase.serviceError(fail);
        this.errors = fail.error.errors;     
        this.busy = false;          
      }
    );    
  }


}
