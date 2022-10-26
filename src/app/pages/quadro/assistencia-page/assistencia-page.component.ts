import { Component, OnInit } from '@angular/core';
import { Assistencia } from 'src/app/models/assistencia.model';
import { AssistenciaDataService } from 'src/app/services/assistencia.service';
import { ErrorService } from 'src/app/services/error.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { Security } from 'src/app/utils/security.util';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { DateUtils } from 'src/app/utils/date.utils';

@Component({
  selector: 'app-assistencia-page',
  templateUrl: './assistencia-page.component.html'
})
export class AssistenciaPageComponent implements OnInit {
  public busy = false;
  public errors: any[] = [];    
  public assistencias: Assistencia[];  
  public form: FormGroup;
  public formConsult: FormGroup;  
  public user: User;   
   

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
    showTodayBtn: true,
    disableSince: {year: new Date().getFullYear(), 
      month: new Date().getMonth() + 1, 
      day: new Date().getDate() + 1}
};  

  constructor(
    private serviceAssistencia: AssistenciaDataService,    
    private serviceBase: ErrorService,
    private fb: FormBuilder,         
    private fbConsult: FormBuilder,             
    private toastr: ToastrService                
  ) { }

  ngOnInit() {
    this.busy = true; 

    this.user = Security.getUser();    

    this.configuraFormConsult();
    this.configuraForm();

    let initialdate = new Date();
    initialdate.setDate(initialdate.getDate()-31);

    let finaldate = new Date();
    finaldate.setDate(finaldate.getDate());


    this.formConsult.patchValue({datainicial: {
    date: {
        year: initialdate.getFullYear(),
        month: initialdate.getMonth() + 1,
        day: initialdate.getDate()}
    },
    datafinal: {
      date: {
          year: finaldate.getFullYear(),
          month: finaldate.getMonth() + 1,
          day: finaldate.getDate()}
      }}    
    );  
    
    this.getAssistencias();
  }

  onDateChangedInitial(event: IMyDateModel) {  
    
    this.formConsult.patchValue({datainicial: {
      date: {
          year: event.date.year,
          month: event.date.month,
          day: event.date.day}
      }});      

    this.getAssistencias();
}

onDateChangedFinal(event: IMyDateModel) {  
    
  this.formConsult.patchValue({datafinal: {
    date: {
        year: event.date.year,
        month: event.date.month,
        day: event.date.day}
    }});      

  this.getAssistencias();
}


  getAssistencias()
  {
    this.serviceAssistencia.getAssistencias(this.formConsult.value)
    .subscribe(Assistencia => {
    this.assistencias = Assistencia;
     this.busy = false;                 
    },
      fail =>{
        this.serviceBase.serviceError(fail);
        this.errors = fail.error.errors;     
        this.busy = false;                    
      });
  }

  configuraFormConsult(){
    this.formConsult = this.fbConsult.group({
      datainicial: ['', Validators.compose([
        Validators.required
      ])],
      datafinal: ['', Validators.compose([
        Validators.required
      ])]      
    });    
  }  
  
  delete(date){
    this
    .serviceAssistencia
    .delete(date)
    .subscribe(
      (data: any) => {
        this.getAssistencias();
        this.busy = false;
        this.toastr.success("Assistência removida com sucesso!", 'Cadastro');
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
      congregacaoId: [0, Validators.compose([

      ])],      
      assistenciaParte1: ['', Validators.compose([
        Validators.required, 
        Validators.max(300)
      ])],      
      assistenciaParte2: ['', Validators.compose([
        Validators.max(300)
      ])]            
    });    
  }  

  submit(){
    this.form.value.congregacaoId = this.user.congregationId
    this.form.value.data =   DateUtils.getMyDatePickerDate(this.form.value.data);
    if (this.form.value.assistenciaParte2 == '' || this.form.value.assistenciaParte2 == null)
     this.form.value.assistenciaParte2 = 0;
    this
    .serviceAssistencia
    .update(this.form.value)
    .subscribe(
      (data: any) => {
        this.getAssistencias();
        this.busy = false;
        this.toastr.success("Assistência da reunião atualizada com sucesso", 'Cadastro');
        this.form.reset();
      },
      fail =>{
        this.serviceBase.serviceError(fail);
        this.errors = fail.error.errors;     
        this.busy = false;          
      }
    );    

  }

}
