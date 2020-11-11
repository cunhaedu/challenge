import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IClient } from '../../client/Client.model';
import { ClientService } from '../../client/Client.service';
import { IBudget, IBudgetData, IBudgetProduct } from '../Budget.model';
import { BudgetService } from '../budget.service';

@Component({
  selector: 'app-create-budget-confirm',
  templateUrl: './create-budget-confirm.component.html',
  styleUrls: ['./create-budget-confirm.component.css']
})
export class CreateBudgetConfirmComponent implements OnInit {

  budgetProducts: IBudgetProduct[];
  client: IClient = {
    name: '',
    fantasy_name: '',
    cnpj: '',
    neighborhood: '',
    size: 'Pequeno Porte',
    contact_email: '',
    email: '',
    cep: '',
    city: '',
    state: '',
    number_of_employees: null,
    contact_phone: '',
    commercial_phone: '',
    address: ''
  };
  budget: IBudget;
  budgetData: IBudgetData;

  constructor(
    private clientService: ClientService,
    private budgetService: BudgetService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const budgetData: IBudgetData = JSON.parse(localStorage.getItem('budget'));

    if (!budgetData) {
      alert('Ocorreu um erro, tente novamente!');
      this.router.navigate(['/']);
    }

    this.budgetData = budgetData;

    this.clientService.getClientById(budgetData.client_id).subscribe(client => {
      this.client = client;
    })

    console.log(this.budgetData);
  }

  handleCreateBudget() {
    this.budgetService.createBudget(this.budgetData).subscribe(() => {
      alert('Orçamento salvo com sucesso, verifique seu email!');
      localStorage.removeItem('budget');
      this.router.navigate(['/']);
    },
    error => {
      alert('Erro ao salvar o orçamento! Verifique todos os campos e tente novamente!');
    })
  }
}
