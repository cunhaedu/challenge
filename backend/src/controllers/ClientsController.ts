import Client from '@entities/Client';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import clientValidator from '../validators/ClientValidator';

export default class CompaniesController {
  public async index(req: Request, res: Response) {
    const clientsRepository = getRepository(Client);

    const clients = await clientsRepository.find();

    return res.json(clients);
  }

  public async show(req: Request, res: Response) {
    const { id } = req.params;
    const clientsRepository = getRepository(Client);

    const client = await clientsRepository.findOne(id);

    if (!client) {
      res.status(400).json({ message: 'Cannot find any client with that id' });
    }

    return res.json(client);
  }

  public async create(req: Request, res: Response) {
    const {
      name,
      fantasy_name,
      cnpj,
      neighborhood,
      size,
      contact_email,
      email,
      cep,
      city,
      state,
      number_of_employees,
      contact_phone,
      commercial_phone,
      address,
    } = req.body;

    const clientsRepository = getRepository(Client);

    const findClientWithSameEmail = await clientsRepository.findOne({
      where: {
        contact_email,
      },
    });

    if (findClientWithSameEmail) {
      return res.status(400).json({ message: 'Theres already a client registered with that email. Please, try it again with another email.' });
    }

    const data = {
      name,
      fantasy_name,
      cnpj,
      neighborhood,
      size,
      contact_email,
      email,
      cep,
      city,
      state,
      number_of_employees,
      contact_phone,
      commercial_phone,
      address,
    };

    await clientValidator.validate(data, {
      abortEarly: false,
    });

    const client = clientsRepository.create(data);

    await clientsRepository.save(client);

    return res.status(201).json(client);
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const {
      name,
      fantasy_name,
      cnpj,
      neighborhood,
      size,
      contact_email,
      email,
      cep,
      city,
      state,
      number_of_employees,
      contact_phone,
      commercial_phone,
      address,
    } = req.body;

    const clientsRepository = getRepository(Client);

    const findClientById = await clientsRepository.findOne(id);

    if (!findClientById) {
      return res.status(400).json({ message: 'cannot find any client with that id.' });
    }

    const data = {
      name,
      fantasy_name,
      cnpj,
      neighborhood,
      size,
      contact_email,
      email,
      cep,
      city,
      state,
      number_of_employees,
      contact_phone,
      commercial_phone,
      address,
    };

    await clientValidator.validate(data, {
      abortEarly: false,
    });

    await clientsRepository.update(id, data);

    const updatedClient = await clientsRepository.findOne(id);

    return res.status(201).json(updatedClient);
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    const clientsRepository = getRepository(Client);

    const client = await clientsRepository.findOne(id);

    if (!client) {
      res.status(400).json({ message: 'Cannot find any client with that id' });
    }

    await clientsRepository.delete(id);

    return res.json();
  }
}
