import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IClient } from './Client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  baseURL = `${environment.FRONTEND_BASE_URL}/clients`

  constructor(private http: HttpClient) { }

  createClient(client: IClient): Observable<IClient> {
    return this.http.post<IClient>(this.baseURL, client);
  }

  getAllClients(): Observable<IClient[]> {
    return this.http.get<IClient[]>(this.baseURL);
  }

  getClientById(id: string): Observable<IClient> {
    const url = `${this.baseURL}/${id}` 
    return this.http.get<IClient>(url);
  }

  updateClient(client: IClient): Observable<IClient> {
    const url = `${this.baseURL}/${client.id}` 
    return this.http.put<IClient>(url, client);
  }

  deleteClient(id: string): Observable<void> {
    const url = `${this.baseURL}/${id}` 
    return this.http.delete<void>(url);
  }
}
