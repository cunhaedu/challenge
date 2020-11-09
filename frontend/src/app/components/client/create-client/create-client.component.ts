import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IClient } from '../Client.model';
import { ClientService } from '../Client.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

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
  }

  constructor(
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  updateClientSize(size: string): void {
    this.client.size = size;
  }

  handleCreateCliente(): void {
    this.clientService.createClient(this.client).subscribe(() => {
        alert('Cliente cadastrado com sucesso!');
        this.router.navigate(['/']);
      },
      error => {
        alert('Erro ao cadastrar o cliente! Verifique todos os campos e tente novamente!');
      }
    )
  }
}
