import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Security } from '../utils/security.util';

export abstract class BaseService {
  protected UrlServiceV1: string = //'https://quadrojwapi.azurewebsites.net/api';
    'http://localhost:51364/api';
  //https://quadrojwapi.azurewebsites.net/api

  public componeHeaders() {
    const token = Security.getUser().access_token;
    const headers = new HttpHeaders().set('Authorization', `bearer ${token}`);
    return headers;
  }


}