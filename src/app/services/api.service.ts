import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getData(endUrl: string) {
    return this.http.get(`${this.baseUrl}/${endUrl}`);
  }

  setDataLit(data: any) {
    return this.http.post(`${this.baseUrl}/project/${data.id}`, data.selectedLit);
  }

  generateJsonProject(id:number) {
    return this.http.get(`${this.baseUrl}/json/${id}`);
  }

  getImport() {
    return this.http.get(`${this.baseUrl}/import/excel`);
  }

  resetOrigin() {
    return this.http.get(`${this.baseUrl}/import/origin`);
  }
}
