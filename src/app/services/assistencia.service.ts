import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { Assistencia } from '../models/assistencia.model';
import { Security } from '../utils/security.util';
import { DateUtils } from '../utils/date.utils';

@Injectable()
export class AssistenciaDataService extends BaseService {

    constructor(private http: HttpClient
        ) { super() }
 
    update(data) {
        return this.http.post(`${this.UrlServiceV1}/v1/assistencia`, data, {headers: this.componeHeaders()})
    }

    getAssistencias(data) {
        return this.http.get<Assistencia[]>(`${this.UrlServiceV1}/v1/assistencia/congregacao/${Security.getUser().congregationId}/datainicial/${DateUtils.getMyDatePickerDate(data.datainicial)}/datafinal/${DateUtils.getMyDatePickerDate(data.datafinal)}`,  {headers: this.componeHeaders()});
    }

    delete(date) {
        return this.http.delete(`${this.UrlServiceV1}/v1/assistencia/congregacao/${Security.getUser().congregationId}/data/${date}`,  {headers: this.componeHeaders()});
    }

    public getMonthlyAssistanceChartData() {
        return this.http.get<Assistencia[]>(`${this.UrlServiceV1}/v1/assistencia/mensal/congregacao/${Security.getUser().congregationId}`,  {headers: this.componeHeaders()});        
      }

}