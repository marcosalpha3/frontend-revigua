import { Component, OnInit } from '@angular/core';
import { Excecao } from 'src/app/models/excecao.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { IMyDpOptions } from 'mydatepicker';
import { ExcecaoDesignacaoDataService } from 'src/app/services/excecaodesignacao.service';
import { ErrorService } from 'src/app/services/error.service';
import { ToastrService } from 'ngx-toastr';
import { Security } from 'src/app/utils/security.util';
import { Irmao } from 'src/app/models/irmao.model';
import { IrmaoDataService } from 'src/app/services/irmao.data.service';
import { DateUtils } from 'src/app/utils/date.utils';

@Component({
  selector: 'app-excecao-designacao-page',
  templateUrl: './excecao-designacao-page.component.html'
})
export class ExcecaoDesignacaoPageComponent implements OnInit {
  public busy = false;
  public mode: string = 'list';    
  public errors: any[] = [];    
  public excecoes: Excecao[];  
  public irmaos: Irmao[];  
  public form: FormGroup;
  public formConsult: FormGroup;  
  public user: User;  
  
  public myDatePickerOptions: IMyDpOptions = {

    // other options...
    dateFormat: 'dd/mm/yyyy',
    showTodayBtn: true
};  
 
  constructor(
    private serviceExcecoes: ExcecaoDesignacaoDataService,    
    private serviceIrmao: IrmaoDataService,        
    private serviceBase: ErrorService,
    private fb: FormBuilder,         
    private toastr: ToastrService      
  ) { }

  ngOnInit() {
    this.busy = true; 
    this.configuraForm();  
    this.user = Security.getUser();        
    this.getIrmaos();
    this.getExcecoes();
  }

  getExcecoes()
  {
    this.serviceExcecoes.get()
    .subscribe(Excecao => {
    this.excecoes = Excecao;
     this.busy = false;                 
    },
      fail =>{
        this.serviceBase.serviceError(fail);
        this.errors = fail.error.errors;     
        this.busy = false;                    
      });
  }

  getIrmaos(){
    this.busy = true; 
    this.serviceIrmao.getIrmaos()
    .subscribe(irmaos => {
      this.irmaos = irmaos;    
    },
      fail =>{
        this.serviceBase.serviceError(fail);
        this.errors = fail.error.errors;     
      });
   }
  
  delete(id){
    this
    .serviceExcecoes
    .delete(id)
    .subscribe(
      (data: any) => {
        this.getExcecoes();
        this.busy = false;
        this.toastr.success("Excecao removida com sucesso!", 'Cadastro');
      },
      fail =>{
        this.serviceBase.serviceError(fail);
        this.errors = fail.error.errors;     
        this.busy = false;          
      }
    );    
  }
  
  configuraForm(){
    this.form = this.fb.group({
      data: ['', Validators.compose([
        Validators.required
      ])],
      motivo: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.required
      ])],      
      irmaoId: ['', Validators.compose([
        Validators.required
      ])]       
    });    
  }
  
  submit(){
    this.form.value.data =   DateUtils.getMyDatePickerDate(this.form.value.data);
    this
    .serviceExcecoes
    .create(this.form.value)
    .subscribe(
      (data: any) => {
        this.getExcecoes();
        this.busy = false;
        this.toastr.success("Exceção registrada com sucesso", 'Cadastro');
        this.form.reset();
        this.mode='list';                  
      },
      fail =>{
        this.serviceBase.serviceError(fail);
        this.errors = fail.error.errors;     
        this.busy = false;          
      }
    );         
  }

  changeMode(mode:string){
    this.mode = mode;
    if (mode != 'list') 
     this.configuraForm();       
     this.errors =  [];
  }

}
