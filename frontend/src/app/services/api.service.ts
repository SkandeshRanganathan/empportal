import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials);
  }

  getRecords(userId: string, role: string, delay?: number): Observable<any> {
    let params = new HttpParams()
      .set('userId', userId)
      .set('role', role);
      
    if (delay) {
      params = params.set('delay', delay.toString());
    }
    
    return this.http.get(`${this.baseUrl}/records`, { params });
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }
}
