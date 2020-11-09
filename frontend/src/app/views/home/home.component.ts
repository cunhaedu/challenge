import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IClient } from 'src/app/components/client/Client.model';
import { ClientService } from 'src/app/components/client/Client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  clients: IClient[]

  constructor(
    private router: Router,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.clientService.getAllClients().subscribe(clients => {
      this.clients = clients.map(client => {
        const firstTwoDigits = client.commercial_phone.substr(0, 2);
        const firstFourValidDigits = client.commercial_phone.substr(2, 4);
        const lastFourValidDigits = client.commercial_phone.substr(6, 9);

        client.commercial_phone = `(${firstTwoDigits}) ${firstFourValidDigits}-${lastFourValidDigits}`

        return client;
      })
    })
  }

  handleNavigateToCreateClient(): void {
    this.router.navigate(['/clients/create']);
  }

  handleDeleteClient(client: IClient): void {
    const confirm = window.confirm(`Tem certeza de que deseja excluir o cliente\n${client.name}?`);

    if (!confirm) {
      return;
    }

    this.clientService.deleteClient(client.id).subscribe(() => {
        alert('Cliente excluído com sucesso!');
        this.ngOnInit();
      },
      error => {
        alert('Erro ao excluir cliente! Tente novamente mais tarde!');
      }
    )
  }
}
