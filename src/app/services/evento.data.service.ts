import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { Evento } from '../models/evento.model';
import { Security } from '../utils/security.util';

@Injectable()
export class EventoDataService extends BaseService {

    constructor(private http: HttpClient
        ) { super() }
 
     create(data) {
        return this.http.post(`${this.UrlServiceV1}/v1/evento`, data, {headers: this.componeHeaders()})
    }

    delete(id) {
        return this.http.delete(`${this.UrlServiceV1}/v1/evento/${id}`, {headers: this.componeHeaders()})
    }

    get() {
        return this.http.get<Evento[]>(`${this.UrlServiceV1}/v1/evento/congregacao/${Security.getUser().congregationId}`,  {headers: this.componeHeaders()});
    }

}