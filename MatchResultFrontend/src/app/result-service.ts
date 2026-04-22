import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ResultModel from './models/ResultModel';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  constructor(private http: HttpClient) {}
  
  public getResults() {
    return this.http.get<ResultModel[]>('http://localhost:5069/api/Match');
  }
}
