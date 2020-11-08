import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICompany } from 'src/app/components/company/Company.model';
import { CompanyService } from 'src/app/components/company/company.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  companies: ICompany[]

  constructor(
    private router: Router,
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.companyService.getAllCompanies().subscribe(companies => {
      this.companies = companies;
    })
  }

  handleNavigateToCreateCompany(): void {
    this.router.navigate(['/products/create']);
  }

  handleDeleteCompany(company: ICompany): void {
    const confirm = window.confirm(`Tem certeza de que deseja excluir o cliente\n${company.name}?`);

    if (!confirm) {
      return;
    }

    this.companyService.deleteCompany(company.id).subscribe(() => {
        alert('Cliente excluído com sucesso!');
        this.ngOnInit();
      },
      error => {
        alert('Erro ao excluir cliente! Tente novamente mais tarde!');
      }
    )
  }
}
