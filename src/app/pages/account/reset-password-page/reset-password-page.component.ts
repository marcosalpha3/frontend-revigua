import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidator } from 'src/app/validators/custom.validator';
import { IrmaoDataService } from 'src/app/services/irmao.data.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html'
})
export class ResetPasswordPageComponent implements OnInit {
  public form: FormGroup;
  public busy = false;
  public errors: any[] = [];    

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private serviceIrmao: IrmaoDataService,   
    private serviceBase: ErrorService,        
    private toastr: ToastrService                 
    ) { 
      this.form = this.fb.group({
        email: ['', Validators.compose([
          Validators.minLength(5),
          Validators.maxLength(100),
          Validators.required,
          CustomValidator.EmailValidator        
      ])]
      });      
    }

  ngOnInit() {
  }


  submit(){
    this.busy = true;
    this
    .serviceIrmao
    .forgotPassword(this.form.value.email)
    .subscribe(
      (data: any) => {
        this.busy = false;
        this.toastr.success("Foi enviado um e-mail para você com a nova senha!", 'Login');
        this.router.navigate(['/login']);        
      },
      fail =>{
        this.serviceBase.serviceError(fail);
        this.errors = fail.error.errors;     
        this.busy = false;          
      }
    );    
  }


}
