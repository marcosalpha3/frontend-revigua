import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/models/evento.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IMyDpOptions } from 'mydatepicker';
import { EventoDataService } from 'src/app/services/evento.data.service';
import { ErrorService } from 'src/app/services/error.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { DateUtils } from 'src/app/utils/date.utils';
import { Security } from 'src/app/utils/security.util';

@Component({
  selector: 'app-evento-page',
  templateUrl: './evento-page.component.html'
})
export class EventoPageComponent implements OnInit {
  public busy = false;
  public mode: string = 'list';    
  public errors: any[] = [];    
  public eventos: Evento[];  
  public form: FormGroup;
  public formConsult: FormGroup;  
  public user: User;     
  
  public myDatePickerOptions: IMyDpOptions = {

    // other options...
    dateFormat: 'dd/mm/yyyy',
    showTodayBtn: true
};  

  constructor(
    private serviceEventos: EventoDataService,    
    private serviceBase: ErrorService,
    private fb: FormBuilder,         
    private toastr: ToastrService                

  ) { 
  }

  ngOnInit() {
    this.busy = true; 
    this.configuraForm();  
    this.user = Security.getUser();        
    this.getEventos();
  }

  getEventos()
  {
    this.serviceEventos.get()
    .subscribe(Evento => {
    this.eventos = Evento;
     this.busy = false;                 
    },
      fail =>{
        this.serviceBase.serviceError(fail);
        this.errors = fail.error.errors;     
        this.busy = false;                    
      });
  }

  delete(id){
    this
    .serviceEventos
    .delete(id)
    .subscribe(
      (data: any) => {
        this.getEventos();
        this.busy = false;
        this.toastr.success("Evento removida com sucesso!", 'Cadastro');
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
      descricao: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.required
      ])],      
      congregacaoId: [0, Validators.compose([

      ])],     
      tipoEvento: ['', Validators.compose([
        Validators.required
      ])]       
    });    
  }
  
  submit(){
    this.form.value.congregacaoId = this.user.congregationId;
    this.form.value.data =   DateUtils.getMyDatePickerDate(this.form.value.data);
    this
    .serviceEventos
    .create(this.form.value)
    .subscribe(
      (data: any) => {
        this.getEventos();
        this.busy = false;
        this.toastr.success("Evento registrado com sucesso", 'Cadastro');
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
