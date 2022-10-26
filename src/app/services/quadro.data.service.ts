import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Security } from '../utils/security.util';
import { DateUtils } from '../utils/date.utils';
import { BaseService } from './base.service';
import { QuadroPersonalizado } from '../models/quadropersonalizado.model';
import { CharUtils } from '../utils/char.utils';


@Injectable()
export class QuadroDataService extends BaseService {

    constructor(private http: HttpClient
        ) { super() }

     getQuadroPersonalizadoAtivo() {
        return this.http.get<QuadroPersonalizado[]>(`${this.UrlServiceV1}/v1/quadro/personalizado/congregacao/${Security.getUser().congregationId}`,  {headers: this.componeHeaders()});
    }

    getDesignicacoes() {
        // Get current and new boar
        return this.http.get<any[]>(`${this.UrlServiceV1}/v1/quadro/congregacao/${Security.getUser().congregationId}`,  {headers: this.componeHeaders()});
    }

    apagar(data) {
        return this.http.post(`${this.UrlServiceV1}/v1/quadro/personalizado`, data, {headers: this.componeHeaders()})
    }

    UploadNovoQuadro(fileImg : File, data : any)  {
        data.titulo = CharUtils.cleanUpSpecialChars(data.titulo);
        const formData = new FormData();
        formData.append('File', fileImg);
        return this.http.post(`${this.UrlServiceV1}/v1/quadro/congregacao/${Security.getUser().congregationId}/expirationdate/${DateUtils.getMyDatePickerDate(data.expirationdate)}/initialdate/${DateUtils.getMyDatePickerDate(data.initialdate)}/titulo/${data.titulo}`, 
        formData, {headers: this.componeHeaders()})
    }

    regerarQuadro() {
        return this.http.post(`${this.UrlServiceV1}/v1/quadro/regerar/congregacao/${Security.getUser().congregationId}`, null, {headers: this.componeHeaders()})
    }


}