import { getDate } from '../utils/getCustomDate';

interface IBudgetTemplate {
  budget: {
    sale_type: string;
    client_id: string;
    users_quantity: number;
    taxes: number;
    commission: number;
    amount: number;
    id: string;
    created_at: Date;
    updated_at: Date;
  },
  client: {
    name: string;
    size: string;
    email: string
  }
}

export default function createBudgetTemplate(data: IBudgetTemplate): string {
  return `
    <h2>Olá,você acabou de realizar um orçamento</h2>
    <h3>Confira os dados a seguir</h3><br>

    <p>Data de criação: ${getDate(data.budget.created_at)}</p><br>

    <p><strong>Informações do Cliente:</strong></p>

    <p>Nome do cliente: ${data.client.name}</p>
    <p>Porte da empresa: ${data.client.size}</p><br>

    <p><strong>Informações do orçamento:</strong></p>

    <p>Tipo de venda: ${data.budget.sale_type}</p>
    <p>Qtd de usuários: ${data.budget.users_quantity}</p>
    <p>Impostos: ${data.budget.taxes}%</p>
    <p>Comissão: ${data.budget.commission}%</p>

    <h3>Valor total: U$ ${(data.budget.amount).toLocaleString('pt-BR')}</h3><br>
  `;
}
