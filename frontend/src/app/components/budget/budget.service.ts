import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBudgetData } from './Budget.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  baseURL = `${environment.FRONTEND_BASE_URL}/budgets`

  constructor(private http: HttpClient) { }

  createBudget(budget: IBudgetData): Observable<IBudgetData> {
    return this.http.post<IBudgetData>(this.baseURL, budget);
  }
}
