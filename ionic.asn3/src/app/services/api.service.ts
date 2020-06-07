import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url: string;

  constructor(public http: HttpClient) {
    this.url = 'http://localhost:4000/';
  }

  get = (method: string, params: any): Promise<any> => {
    return new Promise<any>( async (resolve, reject) => {
      try {
        resolve(await this.http.get( `${this.url}${method}`).toPromise());
      }
      catch (e) {
        reject(e);
      }
    });
  }

  post = (method: string, params: any = {}) => {
    return new Promise<any>( async (resolve, reject) => {
      try {
        resolve(await this.http.post( `${this.url}${method}`, params).toPromise());
      }
      catch (e) {
        reject(e);
      }
    });
  }
}
