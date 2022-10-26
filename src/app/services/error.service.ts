import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ErrorService {

    constructor(private router: Router, 
        private toastr: ToastrService                               
) { }    

    serviceError(error: Response | any){
        let errMsg: string;
    
        if (error instanceof Response) {
    
            errMsg = `${error.status} - ${error.statusText || ''}`;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(error);
        if (error.status == 401 || error.status == 403)
        {
            this.toastr.error('Realize um novo login!', 'Seção Expirada');                    
            this.router.navigate(['/login']);       
        }
        else
        {
            this.toastr.error('Ocorreu um erro no processamento', 'Ops! :(');        
        }
    }   
    
}