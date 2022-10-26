class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorService } from 'src/app/services/error.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IMyDpOptions } from 'mydatepicker';
import { QuadroDataService } from 'src/app/services/quadro.data.service';
import { QuadroPersonalizado } from 'src/app/models/quadropersonalizado.model';
import { DateUtils } from 'src/app/utils/date.utils';

@Component({
  selector: 'app-inserir-quadro-page',
  templateUrl: './inserir-quadro-page.component.html',
  styleUrls: ['./inserir-quadro-page.component.scss']
})
export class InserirQuadroPageComponent implements OnInit {
  public form: FormGroup;
  public busy = false;
  public errors: any[] = [];  
  selectedFile: ImageSnippet;

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
};
  
  constructor(    
    private serviceBase: ErrorService,    
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService, 
    private serviceQuadro: QuadroDataService,         
      ) { }

  ngOnInit() {
   this.configuraForm();
  }

  configuraForm(){
    this.form = this.fb.group({
      titulo: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.required
      ])],
      expirationdate: ['', Validators.compose([
        Validators.required
      ])],
      initialdate: ['', Validators.compose([
        Validators.required
      ])]      
    });    
  }

  submit(imageInput : any){
    this.busy = true;
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.serviceQuadro.UploadNovoQuadro(this.selectedFile.file, this.form.value).subscribe(
        (data: any) => {
          this.busy = false;
          this.toastr.success("Quadro carregado com sucesso!", 'Cadastro');
          this.form.reset();     
          this.errors = null;
          this.router.navigate(['/']);    
        },
        fail =>{
          this.serviceBase.serviceError(fail);
          this.errors = fail.error.errors;     
          this.busy = false;          
        })
    });

    reader.readAsDataURL(file);
  }

}


