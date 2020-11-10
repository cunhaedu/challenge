import { Request, Response } from 'express';
import { getRepository, getConnection, In } from 'typeorm';

import Budget from '@entities/Budget';
import Client from '@entities/Client';
import Product from '@entities/Product';
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

    if (!budget_products || budget_products.length === 0) {
      return res.status(400).json({ message: 'No product provided!' });
    }

    const budgetRepository = getRepository(Budget);
    const budgetProductsRepository = getRepository(BudgetProducts);
    const productsRepository = getRepository(Product);
    const clientsRepository = getRepository(Client);

    const budgetData = {
      client_id,
      sale_type,
      users_quantity,
      taxes,
      commission,
      amount,
    };

    const client = await clientsRepository.findOne(client_id);

    if (!client) {
      return res.status(400).json({ message: 'Invalid client id!' });
    }

    const products_id = budget_products.map((product) => product.product_id);

    const products = await productsRepository.find({
      where: {
        id: In(products_id),
      },
    });

    if (!products || products.length !== budget_products.length) {
      return res.status(400).json({ message: 'Invalid product id!Please, make sure that all products IDs are valid' });
    }

    const budget = budgetRepository.create(budgetData);
    const budgetProductData = budget_products.map((b) => budgetProductsRepository.create(b));

    try {
      await getConnection().transaction(async () => {
        const budget_id = await budgetRepository.save(budget);

        budgetProductData.forEach(async (budgetProductElement) => {
          await budgetProductsRepository.save({
            budget_id,
            ...budgetProductElement,
          });
        });
      });
    } catch {
      return res.status(400).json({ message: 'Cannot save budget in database!' });
    }

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
