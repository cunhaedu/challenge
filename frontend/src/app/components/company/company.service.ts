import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICompany } from './Company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  baseURL = `${environment.FRONTEND_BASE_URL}/companies`

  constructor(private http: HttpClient) { }

  createCompany(company: ICompany): Observable<ICompany> {
    return this.http.post<ICompany>(this.baseURL, company);
  }

  getAllCompanies(): Observable<ICompany[]> {
    return this.http.get<ICompany[]>(this.baseURL);
  }

  getCompanyById(id: string): Observable<ICompany> {
    const url = `${this.baseURL}/${id}` 
    return this.http.get<ICompany>(url);
  }

  updateCompany(company: ICompany): Observable<ICompany> {
    const url = `${this.baseURL}/${company.id}` 
    return this.http.put<ICompany>(url, company);
  }

  deleteCompany(id: string): Observable<void> {
    const url = `${this.baseURL}/${id}` 
    return this.http.delete<void>(url);
  }
}
