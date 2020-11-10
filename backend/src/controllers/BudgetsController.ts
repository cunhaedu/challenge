import { Request, Response } from 'express';
import { getRepository, getConnection } from 'typeorm';

import Budget from '@entities/Budget';
import Client from '@entities/Client';
import BudgetProducts from '@entities/BudgetProducts';

import { MailTrapMailProvider } from '../providers/implementations/MailTrapMailProvider';
import createBudgetTemplate from '../templates/MailTrapTemplate';

const mailProvider = new MailTrapMailProvider();

export default class BudgetsController {
  public async index(req: Request, res: Response) {
    const budgetsRepository = getRepository(Budget);

    const budgets = await budgetsRepository.find();

    return res.json(budgets);
  }

  public async show(req: Request, res: Response) {
    const { id } = req.params;

    const budgetProductsRepository = getRepository(BudgetProducts);

    const budgetProducts = await budgetProductsRepository.find({
      where: {
        budget_id: id,
      },
    });

    return res.json(budgetProducts);
  }

  public async create(req: Request, res: Response) {
    const {
      client_id,
      sale_type,
      users_quantity,
      taxes,
      commission,
      amount,
      budget_products,
    } = req.body;

    const budgetRepository = getRepository(Budget);
    const budgetProductsRepository = getRepository(BudgetProducts);
    const clientsRepository = getRepository(Client);

    const budgetData = {
      client_id,
      sale_type,
      users_quantity,
      taxes,
      commission,
      amount,
    };

    const budget = budgetRepository.create(budgetData);
    const client = await clientsRepository.findOne(client_id);
    const budgetProductData = budget_products.map((b) => budgetProductsRepository.create(b));

    await getConnection().transaction(async () => {
      const budget_id = await budgetRepository.save(budget);

      budgetProductData.forEach(async (budgetProductElement) => {
        await budgetProductsRepository.save({
          budget_id,
          ...budgetProductElement,
        });
      });
    });

    await mailProvider.sendMail({
      to: {
        name: client.name,
        email: client.email,
      },
      from: {
        name: 'Equipe do app',
        email: 'equipe@app.com',
      },
      subject: 'Novo cadastro de Orçamento',
      body: createBudgetTemplate({
        budget,
        client,
      }),
    });

    return res.status(201).json({
      budget,
      budget_products: budgetProductData,
    });
  }
}
