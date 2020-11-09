import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IClient } from '../Client.model';
import { ClientService } from '../Client.service';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit {

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
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.clientService.getClientById(id).subscribe(client => {
      this.client = client;
    })
  }

  updateClientSize(size: string): void {
    this.client.size = size;
  }

  handleUpdateClient(): void {
    this.clientService.updateClient(this.client).subscribe(() => {
        alert('Cliente atualizado com sucesso!');
        this.router.navigate(['/']);
      },
      error => {
        alert('Erro ao atualizar o cliente! Verifique todos os campos e tente novamente!');
      }
    )
  }
}
